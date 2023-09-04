const Toggle = document.getElementById('Toggle');
const Button = document.querySelectorAll('.Button');
const Shadows = document.querySelector('.Shadows');
const Menu = document.querySelector('.Menu');
const PrimaryTitle = document.querySelector('.Primary');
const SecondaryTitle = document.querySelector('.Secondary');
const Bind = document.getElementById('bind');
const Desc = document.getElementById('message');
const Title = document.querySelector('.title');
const Msg = document.querySelector('.action');

function saveActiveState() {
  const isActive = Toggle.classList.contains('active');
  localStorage.setItem('isActive', isActive);
}

function restoreActiveState() {
  const bind = $("#bind");
  const message = $("#message");
  const isActive = localStorage.getItem('isActive') === 'true';
  if (isActive) {
    Toggle.classList.add('active');
    Shadows.classList.add('active');
    Menu.classList.add('active');
    PrimaryTitle.classList.add('active');
    SecondaryTitle.classList.add('active');
    Bind.classList.add('active');
    Desc.classList.add('active');
    Title.classList.add('active');
    Msg.classList.add('active');
  }
  bind.css('background-color', localStorage.getItem("selectedPrimaryColor"));
  message.css('background-color', localStorage.getItem("selectedSecondaryColor"));
}

Toggle.onclick = function() {
  Toggle.classList.toggle('active');
  Shadows.classList.toggle('active');
  Menu.classList.toggle('active');
  PrimaryTitle.classList.toggle('active');
  SecondaryTitle.classList.toggle('active');
  Bind.classList.toggle('active');
  Desc.classList.toggle('active');
  Title.classList.toggle('active');
  Msg.classList.toggle('active');
  saveActiveState();
}

window.addEventListener('message', function (event) {
  if (event.data.action == 'ShowUI') {
    bind = event.data.bind;
    title = event.data.title;
    msg = event.data.msg;
    $('#bind').html(bind);
    $('.title').html(title);
    $('.action').html(msg);
    $('#wrapper').fadeIn();
  } else if (event.data.action == 'HideUI') {
    $('#bind').html('');
    $('.title').html('');
    $('.action').html('');
    $('#wrapper').fadeOut();
  } else if (event.data.action == 'ShowSetings') {
    $('#bind').html('');
    $('.title').html('');
    $('.action').html('');
    $('.Menu').fadeIn();
    $('#wrapper').fadeIn();
  } else if (event.data.action == 'HideSetings') {
    $('#bind').html('');
    $('.title').html('');
    $('.action').html('');
    $('.Menu').fadeOut();
    $('#wrapper').fadeOut();
  }
});

Button.forEach(div => {
  div.addEventListener('click', function() {
    Button.forEach(div => {
      div.classList.remove('active');
    });
    this.classList.add('active');
  });
});

$(document).ready(function() {
  restoreActiveState();

  const PrimaryColorInput = $(".primary-color");
  const savePrimaryButton = $(".save-primary-color");
  const bind = $("#bind");

  const savedPrimaryColor = localStorage.getItem("selectedPrimaryColor");
  if (savedPrimaryColor) {
    bind.css('background-color', savedPrimaryColor);
    PrimaryColorInput.val(savedPrimaryColor);
  }

  PrimaryColorInput.on("input", function() {
    const selectedPrimaryColor = $(this).val();
    bind.css('background-color', selectedPrimaryColor);
  });

  savePrimaryButton.on("click", function() {
    const selectedPrimaryColor = PrimaryColorInput.val();

    if (selectedPrimaryColor) {
      localStorage.setItem("selectedPrimaryColor", selectedPrimaryColor);
      bind.css('background-color', selectedPrimaryColor);
    }
  });

  const SecondaryColorInput = $(".secondary-color");
  const saveSecondaryButton = $(".save-secondary-color");
  const message = $("#message");

  const savedSecondaryColor = localStorage.getItem("selectedSecondaryColor");
  if (savedSecondaryColor) {
    message.css('background-color', savedSecondaryColor);
    SecondaryColorInput.val(savedSecondaryColor);
  }

  SecondaryColorInput.on("input", function() {
    const selectedSecondaryColor = $(this).val();
    message.css('background-color', selectedSecondaryColor);
  });

  saveSecondaryButton.on("click", function() {
    const selectedSecondaryColor = SecondaryColorInput.val();

    if (selectedSecondaryColor) {
      localStorage.setItem("selectedSecondaryColor", selectedSecondaryColor);
      message.css('background-color', selectedSecondaryColor);
    }
  });
});

document.onkeyup = function (data) {
  if (data.which == 27) {
    $.post("https://zeripxzz-textui/HideSetings", JSON.stringify({}));
  }
};
