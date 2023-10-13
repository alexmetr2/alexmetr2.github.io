$(document).ready(function () {
    // Function to update the time and date
    function updateTime() {
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based
        const year = currentDate.getFullYear();

        const timeString = `${hours}:${minutes}`;
        const dateString = `${day}/${month}/${year}`;

        // Update the time and date in the HTML
        $(".time p:nth-child(1)").text(timeString);
        $(".time p:nth-child(2)").text(dateString);
    }

    // Update the time immediately when the page loads
    updateTime();

    // Update the time every second
    setInterval(updateTime, 1000);

    // Volume Control
    let volumeLevel = 50; // Initial volume level (you can set this to any value you prefer)

    // Function to update the volume icon and level
    function updateVolumeIconAndLevel() {
        const volumeIcon = $(".fas.fa-volume-up");
        const volumeText = volumeLevel + "%";
        volumeIcon.attr("title", `Volume: ${volumeText}`);
    }

    // Initialize volume icon and level
    updateVolumeIconAndLevel();

    // Click event for volume control
    $(".fas.fa-volume-up").parent().click(function () {
        // Create a pop-up slider for volume control
        const popup = $(`
            <div class="volume-popup">
                <input type="range" min="0" max="100" value="${volumeLevel}" class="volume-slider" orient="vertical">
            </div>
        `);
        $("body").append(popup);

        // Position the pop-up slider next to the volume icon
        const volumeIcon = $(".fas.fa-volume-up").parent();
        const volumeOffset = volumeIcon.offset();
        const volumeWidth = volumeIcon.outerWidth();
        const volumeHeight = volumeIcon.outerHeight();
        popup.css({
            top: volumeOffset.top + volumeHeight + "px",
            left: volumeOffset.left + volumeWidth + "px"
        });

        // Update volume when the slider is moved
        $(".volume-slider").on("input", function () {
            volumeLevel = $(this).val();
            updateVolumeIconAndLevel();

            // You can add logic here to control the actual system volume using APIs if available
            // For example, on a web-based application, you might use the Web Audio API to control audio volume.
        });

        // Close the pop-up when clicking outside of it
        $(document).mouseup(function (e) {
            if (!popup.is(e.target) && popup.has(e.target).length === 0) {
                popup.remove();
            }
        });
    });

    // --MENU WINDOWS--
    $(".left > span").click(function () {
        $(".menu-down").toggleClass("menu-up");
    });

    // --WINDOW ACTION--
    $(".menu-down .action").mouseenter(function () {
        $(".menu-down .action .title").animate({
            width: '16.25em' /* 260/16 */
        }, 100);
        $('.menu-down .action .title > p').css({
            overflow: 'visible',
            textIndent: '1em'
        });
        $('.menu-down .action').css({
            boxShadow: '2px 0px 5px 0px rgba(0,0,0,0.75)'
        });
    });
    $(".menu-down .action").mouseleave(function () {
        $(".menu-down .action .title").animate({
            width: '3.4375em' /* 55/16 */
        }, 100);
        $('.menu-down .action .title > p').css({
            overflow: 'hidden',
            textIndent: '-666em'
        });
        $('.menu-down .action').css({
            boxShadow: '4px 0px 5px -1px rgba(0,0,0,0.0)'
        });
    });

    // --GROUP--
    $(".menu-down .group .box-group").mouseenter(function () {
        $('.box-group .txt').css({
            overflow: 'visible',
            textIndent: '0',
            width: '100%'
        });
    });
    $(".menu-down .group .box-group").mouseleave(function () {
        $('.box-group .txt').css({
            overflow: 'hidden',
            textIndent: '100%',
            whiteSpace: 'nowrap',
            width: '0'
        });
    });

    // --TO EXPLORE--
    $(".menu-down .group .box-explo").mouseenter(function () {
        $('.box-explo .txt .content').css({
            display: 'block',
        });
    });
    $(".box-explo").mouseleave(function () {
        $('.box-explo .txt .content').css({
            display: 'none',
        });
    });

    // --DESKTOP APPLICATIONS--
    $(".icon").draggable();
    $("#trash").droppable({
        accept: ".icon",
        drop: function (event, ui) {
            ui.draggable.fadeOut(function () {
                ui.draggable.remove();
            });
        }
    });
});
