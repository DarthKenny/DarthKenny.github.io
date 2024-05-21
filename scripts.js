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
  
 $(document).ready(function(){
    $('#contact-form').on('submit', function(event){
        event.preventDefault(); // Остановить отправку формы обычным способом

        var formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        };

        $.ajax({
            type: 'POST',
            url: 'send_mail.php',
            data: formData,
            dataType: 'text', // Ожидаем текстовый ответ от сервера
            success: function(response) {
                showNotification('success', response);
            },
            error: function(xhr, status, error) {
                showNotification('danger', xhr.responseText || "Ошибка при отправке сообщения.");
            }
        });
    });

    function showNotification(type, message) {
        var notification = $('#notification');
        notification.removeClass('alert-success alert-danger').addClass('alert-' + type);
        notification.text(message).addClass('show');

        setTimeout(function() {
            notification.removeClass('show');
        }, 5000); // Убрать уведомление через 5 секунд
    }
});
