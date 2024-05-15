document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.querySelector(".gallery");
    const prevButton = document.querySelector(".gallery-btn-prev");
    const nextButton = document.querySelector(".gallery-btn-next");

    let currentIndex = 0;
    const maxIndex = gallery.children.length - 1;

    prevButton.addEventListener("click", function() {
      currentIndex = (currentIndex === 0) ? maxIndex : currentIndex - 1;
      moveGallery();
    });

    nextButton.addEventListener("click", function() {
      currentIndex = (currentIndex === maxIndex) ? 0 : currentIndex + 1;
      moveGallery();
    });

    function moveGallery() {
      const newPosition = currentIndex * -100 + "%";
      gallery.style.transform = `translateX(${newPosition})`;
    }
  });
  

(function() {
    emailjs.init("tGtWqlI6zaN2RT-r-");
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const templateParamsToMe = {
        from_name: name,
        from_email: email,
        message: message
    };

    const templateParamsToUser = {
        from_name: name,
        user_email: email
    };

    emailjs.send('service_f3t24qi', 'template_lvy4pgc', templateParamsToMe)
        .then(function(response) {
            console.log('SUCCESS (to me)!', response.status, response.text);
        }, function(error) {
            console.log('FAILED (to me)...', error);
        });

    emailjs.send('service_f3t24qi', 'template_hsdodm7', templateParamsToUser)
        .then(function(response) {
            console.log('SUCCESS (to user)!', response.status, response.text);
            showModal('Сообщение успешно отправлено. Спасибо за ваше обращение.');
        }, function(error) {
            console.log('FAILED (to user)...', error);
            showModal('Ошибка при отправке сообщения.');
        });
});

function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}
