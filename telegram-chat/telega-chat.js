//Стили пишите сами!!!!
//Картинки и звуки качайте сами!


// window.$ = (el) => {
//   if(document.querySelector(el) !== null) return document.querySelector(el)
//   // else console.warn(`${el} не найдем в дом дереве`);
// };

// window.$$ = (el) => {
//   if(document.querySelectorAll(el) !== null) return document.querySelectorAll(el)
// };


// window.soundPush = (url) => {

//     let audio = new Audio(); // Создаём новый элемент Audio
//     audio.src = url; // Указываем путь к звуку "клика"
//     audio.autoplay = true; // Автоматически запускаем
//     audio.volume = 0.7
//     $('body').appendChild(audio)
  
//     audio.addEventListener("ended",e => {
//       stopAudio()
//       audio.remove()
//     })
    
//     return url
//   }

window.findElement = (el) => {
  if (document.querySelector(el) !== null) return document.querySelector(el);
};

window.findElements = (el) => {
  if (document.querySelectorAll(el) !== null) return document.querySelectorAll(el);
};

window.soundPush = (url) => {
  let audio = new Audio();
  audio.src = url;
  audio.autoplay = true;
  audio.volume = 0.7;
  findElement('body').appendChild(audio);

  audio.addEventListener("ended", e => {
    stopAudio();
    audio.remove();
  });

  return url;
}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  let timeNow = new Date().toLocaleTimeString();
  
   const token = `6010401570:AAGvU6SA_ogA1OnOFUl2JZVGFNwOS53XMrg`;
 
   const chatId = `1040632789`;  //получаем при вызове https://api.telegram.org/bot6010401570:AAGvU6SA_ogA1OnOFUl2JZVGFNwOS53XMrg/getupdates в браузере
  
  let startChat = false
  
  let lastMessId , FirstMessId, newMessId, checkReply, Timer , count;
  
  const idStart = getRandomInt(999);
  
  const manager = 'Менеджер - Грета'
  
  let tpl = `<div class="chat__wrap">
  <div class="chat__title">Онлайн-чат
  <div class="btm__close chat__close">&times;</div>
  </div>
  <div class="chat__body">
  <div class="chat__body__item chat__body__item__manager">
  <span class="chat__body__item__user">${manager} Online</span>
  <span class="chat__body__item__text">Здравствуйте! Какой у Вас вопрос?</span>
  <i class="chat__body__item__time">${timeNow}</i>
  </div>
  </div>
  <div class="chat__input">
      <div class="chat__input__message">
          <textarea rows="1" wrap="on" type="text" class="chat__main__input" aria-label="Напишите сообщение" placeholder="Напишите сообщение" required ></textarea>
      </div>
      <img class="chat__input__submit" src="img/chat/send.svg" alt="Отправить" />
  </div>
  
  </div>`;
  
  
   class TelegaChat {
    open() {
  
      if (window.innerWidth < 768) findElement("body").classList.add('overflow__hidden')
  
      if (!findElement(".chat__wrap")) findElement("body").insertAdjacentHTML("afterbegin", tpl);
  
      let store = localStorage.getItem("historyMessages");
  
      if (store !== null) {
        findElement(".chat__body").innerHTML = store;
      }
  
      findElement(".chat__main__input").onkeypress = (e) => {
        if (e.key === `Enter`) this.submit();
        if(e.target.value !== '') findElement(".chat__main__input").classList.remove('validate__error')
      };
      
      findElement(".chat__input__submit").onclick = () => this.submit();
  
      findElement(".chat__close").onclick = () => this.close()
  
      findElement(".chat__body").scrollTop = 100000;
  
      findElement(".chat__wrap").classList.add("open");
  
      setTimeout(() => {
        findElement('.chat__main__input').focus()
      }, 1000);
  
      
      axios
        .get(`https://api.telegram.org/bot${token}/getupdates`)
  
        .then((r) => {
          lastMessId = r.data.result[r.data.result.length - 1].message.message_id;
          FirstMessId = lastMessId
        })
        .catch(r=>{
          return ``
        })
  
      this.deleteItem()
      
    }
  
    close() {
      clearInterval(Timer)
      findElement(".chat__wrap").classList.remove("open");
      if (window.innerWidth < 768) findElement("body").classList.remove('overflow__hidden')
    }
  
    deleteItem(){
  
      findElements('.chat__body__item').forEach(el => {
  
        if(el.querySelector('.chat__body__item__delete')) el.querySelector('.chat__body__item__delete').onclick = () => {
            el.remove()
            localStorage.setItem("historyMessages", findElement(".chat__body").innerHTML);
        }
      
  
    });
    }
  
    
    
  
  
    submit() {
      let val = findElement(".chat__main__input").value;
      if (val !== ``) {
        findElement('.chat__main__input').classList.remove('validate__error')
        let tplItemClient = `<div class="chat__body__item chat__body__item__client">
        <div class="btm__close chat__body__item__delete cards__theme">×</div>
        
      <span class="chat__body__item__user">Вы</span>
      <span class="chat__body__item__text">${val}</span>
      <i class="chat__body__item__time">${timeNow}</i></div>`;
  
        findElement(".chat__body").innerHTML += tplItemClient;
  
        findElement(".chat__body").scrollTop = 100000;
  
        axios.get(
          `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=Юзер:${idStart}
          ${val}`
        );
  
        soundPush("/sound/set-whatsapp.mp3");
  
        localStorage.setItem("historyMessages", findElement(".chat__body").innerHTML);
  
        setTimeout(() => {
          findElement(".chat__main__input").value = ``.trim();
        }, 0);
      } else {
  
        alert( `Введите текст`)
  
        // shakeForm($('.chat__main__input'))
      }
      this.deleteItem()
  
      Timer = setInterval(() => this.checkResponse(), 3000);
  
      if (typeof ym === "function" && startChat === false) {
        ym(49104928, "reachGoal", "start__chat");
        startChat = true
      }
  
      findElement(".chat__main__input").value = ``
  
    }
  
    checkResponse() {
  
      count++
  
      if(count > 120 && lastMessId === FirstMessId) clearInterval(Timer)
    
      axios
        .get(`https://api.telegram.org/bot${token}/getupdates`)
        .then((r) => {
  
          let resLastMess = r.data.result[r.data.result.length - 1].message
          if(resLastMess.reply_to_message !== undefined) checkReply = resLastMess.reply_to_message.text.includes(idStart)
          else checkReply = false
  
          newMessId = resLastMess.message_id;
  
          // console.log(FirstMessId, lastMessId , newMessId, checkReply);
  
          if (newMessId > lastMessId && checkReply) {
  
            let Text = r.data.result[r.data.result.length - 1].message.text;
  
            let tplItemMenager = `<div class="chat__body__item chat__body__item__manager">
            <div class="btm__close chat__body__item__delete cards__theme">×</div>
            <span class="chat__body__item__user">${manager}</span>
              <span class="chat__body__item__text">${Text}</span>
              <i class="chat__body__item__time">${timeNow}</i></div>`;
  
            findElement(".chat__body").innerHTML += tplItemMenager;
  
            this.deleteItem()
  
            soundPush("/sound/get-whatsapp.mp3");
  
            localStorage.setItem("historyMessages", findElement(".chat__body").innerHTML);

            findElement(".chat__body").scrollTop = 100000;
  
            lastMessId = newMessId
  
          }
        })
        .catch(r=>{
          return ``
        })
    }
  }
  

//Ниже закоментирована старая версия 

// window.$ = (el) => document.querySelector(el);

// let timeNow = new Date().toLocaleTimeString()

// let token = `тут токен бота` //получаем при создании бота

// let chatId = `тут id чата` //получаем при вызове https://api.telegram.org/bot{token}/getupdates в браузере

// let botId = `тут bot id` 


// let lastMesText,lastMesTime,nowMesTime,chatUpdater

// let tpl = `
// <div class="chat__wrap">
// <div class="chat__title">Online Чат
// <div class="btm__close chat__close">&times;</div>
// </div>
// <div class="chat__body">
// <div class="chat__body__item chat__body__item__manager">
// <span class="chat__body__item__user">Менеджер</span>
// <span class="chat__body__item__text">Здравствуйте какой у вас вопрос?</span>
// <i class="chat__body__item__time">${timeNow}</i>
// </div>
// </div>
// <div class="chat__input">
//     <div class="chat__input__message">
//         <textarea type="text" class="chat__main__input" aria-label="Напишите сообщение" placeholder="Напишите сообщение" required></textarea>
//     </div>
//     <button class="chat__input__submit" aria-label="Отправить сообщение" style="background-image:url('img/angle-up.svg')"></button>
// </div>

// </div>`;



// class TelegaChat {

// init(){ 

    
//     $('body').insertAdjacentHTML( 'afterbegin', tpl)

//     let store = localStorage.getItem("historyMessages");

//     if (store !== null) {
//       $('.chat__body').innerHTML = store
//     }

//     $('.chat__main__input').addEventListener('keypress', (e)=>{

//       if(e.key === `Enter`) this.submit();

//     })

//     $(".chat__input__submit").onclick = () => this.submit();

    

//   }



//   open() {

//         $(".chat__close").addEventListener("click", (e) =>this.close());

//         $(".chat__body").scrollTop = 100000;

//         $('.chat__wrap').classList.add('open')

//         axios.get(`https://api.telegram.org/bot${botId}:${token}/getupdates`)

//         .then(r=>{

//           lastMesTime = r.data.result[r.data.result.length - 1].message.date

//         })

//         if(typeof ym === 'function') ym(49104928,'reachGoal','chat-open')

//         chatUpdater =  setInterval(() => this.checkResponse(),1000)

//   }

//   close() {
//     $('.chat__wrap').classList.remove('open')
//     // clearInterval(chatUpdater);
//   }

//   submit() {

//     //отправка сообшения клиентом

//     let val = $(".chat__main__input").value;

//     if(val !== ``) {


//     let tplItemClient = `<div class="chat__body__item chat__body__item__client">
//     <span class="chat__body__item__user">Вы</span>
//     <span class="chat__body__item__text">${val}</span>
//     <i class="chat__body__item__time">${timeNow}</i></div>`;


//     $('.chat__body').innerHTML += tplItemClient;

//     $(".chat__main__input").value = ``.trim()

//     $(".chat__body").scrollTop = 100000;

//     axios.get(`https://api.telegram.org/bot${botId}:${token}/sendMessage?chat_id=${chatId}&text=${val}`)

//     // soundPush('/sound/set.mp3'); //эта функция вызова звука (звук уведомления об отправке и получение сообшения) есть у меня в репе --- https://github.com/themaltsev/open-plugins/blob/master/add-sound.js

//   }
//   else {
//     alert(`Введите текст`)
//   }
// }

//   checkResponse() {

//       axios.get(`https://api.telegram.org/bot${botId}:${token}/getupdates`)
//         .then((r) => {

//           nowMesTime = r.data.result[r.data.result.length - 1].message.date

//           if(nowMesTime !== lastMesTime) {
            
//           //клиент получает сообщение

//           lastMesTime = nowMesTime

//           let Text = r.data.result.pop().message.text

//             let tplItemMenager = `<div class="chat__body__item chat__body__item__manager">
//             <span class="chat__body__item__user">Менеджер</span>
//             <span class="chat__body__item__text">${Text}</span>
//             <i class="chat__body__item__time">${timeNow}</i></div>`;
            
//             $(".chat__body").innerHTML += tplItemMenager;
  
//            if(localStorage) localStorage.setItem("historyMessages", $(".chat__body").innerHTML);
  
//             $('.chat__wrap').classList.contains('open')? ``: alert(`Сообщение: ${Text}`)

//             $(".chat__body").scrollTop = 100000;

//             // soundPush('/sound/get.mp3'); // эта функция вызова звука (звук уведомления об отправке и получение сообшения) есть у меня в репе --- https://github.com/themaltsev/open-plugins/blob/master/add-sound.js

//         }
//         });


//   }
// }


// new TelegaChat().init()
