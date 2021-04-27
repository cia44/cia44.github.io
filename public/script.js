window.addEventListener("load", function(){
    Sentry.init({
      dsn: "https://2baf4fa18b484ba3b90c5cf126a28e1a@o66461.ingest.sentry.io/5759812",
      tracesSampleRate: 1.0,
    });

    Sentry.captureMessage("Application ouverte");

    var loginFailure = $('#login_failure');
    var loginSuccess = $('#login_success');

    var loginModal = $('#modal_login');
    var loginInput = $('input', loginModal);
    var loginButton = $('button', loginModal);

    var videoModal = $('#modal_video');
    var videoPlayer = $('video', videoModal);
    var videoPlay = $('#play', videoModal);

    var cryptButton = $('#crypt', videoModal);
    var cryptModal = $('#modal_crypt');

    var finishModal = $('#modal_finish');
    var finishButton = $('a', finishModal);
    var finishProgress = $('#progress', finishModal);

    loginFailure.hide();
    loginModal.show();
    loginInput.focus();
    cryptButton.hide();
    finishButton.hide();

    loginButton.click(function () {
        if ('007' !== loginInput.val()) {
            Sentry.captureMessage("Mauvais identifiant: " + loginInput.val());

            loginFailure.fadeIn().delay(2000).fadeOut();

            return;
        }

        Sentry.captureMessage("Identifiant correct: " + loginInput.val());

        loginSuccess.fadeIn().delay(2000).fadeOut();

        loginModal.delay(500).fadeOut();
        videoModal.delay(2500).fadeIn();

        videoPlay.click(function () {
            Sentry.captureMessage("Lancement de la vidéo");

            videoPlayer.get(0).play();
            videoPlay.hide();

            cryptButton.fadeOut().delay(2.2 * 60 * 1000).fadeIn().click(function () {
                Sentry.captureMessage("Lancement de l'énigme");

                videoModal.fadeOut();
                videoPlayer.get(0).pause();
                cryptModal.delay(1000).fadeIn();

                var cryptValid = function () {
                    if ('gipa' !== $('#crypt1', cryptModal).val().toLowerCase()) {
                        return;
                    }

                    if ('44' !== $('#crypt2', cryptModal).val().toLowerCase()) {
                        return;
                    }

                    Sentry.captureMessage("Énigme résolue.");

                    cryptModal.fadeOut();
                    finishModal.delay(500).fadeIn();

                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function(iteration) {
                        setTimeout(
                            function() {
                                finishProgress.html(iteration);
                            },
                            (iteration + 1) * 1000
                        );
                    });

                    setTimeout(
                        function() {
                            finishButton.fadeIn();
                        },
                        11000,
                    );
                };

                $('#crypt1', cryptModal).keyup(cryptValid);
                $('#crypt2', cryptModal).keyup(cryptValid);
            });
        });

    });
});
