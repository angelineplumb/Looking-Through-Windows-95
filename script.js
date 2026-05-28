let highestZ = 1000;

function openModal(id) {
  $("#" + id).show()
  $("#" + id).css("z-index", ++highestZ);
}

document.getElementById("inboxButton").addEventListener("dblclick", () => {
  openModal('passwordModal');
});

document.getElementById("notepadButton").addEventListener("dblclick", () => {
  $('#notepadTitle').text('Untitled - Notepad');
  $('#notepadText').val('');
  openModal('notepadModal');
});

document.getElementById("recyclingButton").addEventListener("dblclick", () => {
  openModal('recyclingModal');
});

document.getElementById("paintButton").addEventListener("dblclick", () => {
  openModal('paintModal');
});

document.getElementById("musicButton").addEventListener("dblclick", () => {
  openModal('musicModal');
});

document.getElementById("submitButton").addEventListener("click", () => {
  if ($('#emailUsername').val() == 'stevethompson@aol.com' && $('#password').val() == 'weezer') {
    var inboxModal = document.getElementById("inboxModal");
    inboxModal.style.display = "block";
    document.getElementById("passwordModal").style.display = "none";
    document.getElementById("incorrect").style.display = "none";
  }
  else {
    document.getElementById("incorrect").style.display = "inline";
  }
});

$(document).on("mousedown", ".modal, .modal *", function() {
  $(this).closest(".modal").css("z-index", ++highestZ);
});

let counter = 0;
function makeFolderModal($this){
  let newModalID = 'folderModal-' + counter; 
  var $modal = $('<div id="folderModal" class="modal" style="width: 525px"></div');
  var $modalContent = $('<div class="modal-content"></div>');
  var $modalHeader = $('<div class="modal-header" style="justify-content: left;"></div');

  var $header = $('<h6 style="padding-left: 10px;" id="folderTitle-' + counter + '"></h6>');
  var $span = $('<span class="close">&times;</span>')
  var $modalBody = $('<div class="modal-body" style="text-align: left; padding:1px 1px 20px 1px"></div>');
  var $modalOptions = $('<div style="display: flex; justify-content: flex-start; padding-left: 5px; margin: 0px; width:525px; border: 2px outset lightgray; border-top: none;"><p style="padding-right: 15px; margin-top: 0px; margin-bottom: 2px;"><u>F</u>ile</p><p style="padding-right: 15px;  margin-top: 0px; margin-bottom: 2px;"><u>E</u>dit</p><p style="padding-right: 15px;  margin-top: 0px; margin-bottom: 2px;"><u>V</u>iew</p><p style="padding-right: 15px;  margin-top: 0px;margin-bottom: 2px;"><u>H</u>elp</p></div>');
  var $modalContainer = $('<div class="container" style="display: flex; margin-top: 25px; justify-content: center;"></div>');
  var $folderButton = $('<button class="button--folder folder" type="button" style="text-align: center;"><img src="Icons/Folder.ico" alt="Icon"><span class="button-text" style="color: black;"></span></button>')

  let buttonNameArray = [];
  let natoAlphabet = 'Alpha,Bravo,Charlie,Delta/Echo,Foxtrot,Golf,Hotel/India,Juliette,Kilo,Lima/Mike,November,Oscar,Papa/Quebec,Romeo,Sierra,Tango/Uniform,Victor,Whisky,Xray/Whiskey,Xray,Yankee,Zulu';
  let natoAlphArray = natoAlphabet.split('/');
  for(let x of natoAlphArray){
    console.log(x);
    if(x.includes($($this[0].childNodes[2]).text())){
      buttonNameArray = x;
    }
  }

  for(let i = 0; i < 4; i++){
    let names = buttonNameArray.split(',');
    $newButton = $folderButton.clone(true);
    $($newButton[0].childNodes[1]).text(names[i]);
    $modalContainer.append($newButton);
  }
  $modalHeader.append($header, $span);
  $modalBody.append($modalOptions, $modalContainer);
  $modalContent.append($modalHeader, $modalBody);
  $modal.append($modalContent);

  $modal.attr('id', newModalID);
  $header.text($this.text());

  counter++;
  return $modal;
}
$(document).on("dblclick", ".folder", async function () {
  $modal = await makeFolderModal($(this));
  let folderTop = Number($('#folderModal').css('top').split('p')[0]) + (counter * 20);
  let folderLeft = Number($('#folderModal').css('left').split('%')[0]) + (counter * 2);

  $modal.css('top',  "" + folderTop + "px");
  $modal.css('left', "" + folderLeft + "%");
  
  $('#folderModal').after($modal);
  dragModals($modal)
  openModal($modal.attr('id'));
});

$(document).on("click", ".close", function () {
  if($(this).closest(".modal")[0].id == 'musicModal'){
    audio.pause();
  }
  $(this).closest(".modal").hide();
});

$(".modal").each(function () {
  dragModals($(this));
});

function dragModals($modal){
  const $header = $modal.find(".modal-header");

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  $modal.on("mousedown", function () {
    $(this).css("z-index", ++highestZ);
  });

  $header.on("mousedown", function (e) {
    console.log("header clicked");
    isDragging = true;
    offsetX = e.clientX - $modal[0].offsetLeft;
    offsetY = e.clientY - $modal[0].offsetTop;
    e.preventDefault();
  });

  $(document).on("mousemove", function (e) {
    if (!isDragging) return;
      $modal.css({
        left: e.clientX - offsetX,
        top: e.clientY - offsetY
      });
  });

  $(document).on("mouseup", function () {
    isDragging = false;
  });
}

async function loadInboxTable(csvUrl) {
  const data = await new Promise((resolve) => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: function (results) {
        resolve(results.data);
      }
    });
  });

  const columns = Object.keys(data[0]).map(key => ({
    title: key,
    data: key
  }));

  return $('#inboxTable').DataTable({
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null
    },
    destroy: true,
    select: true,
    columnDefs: [
      {
        target: 1,
        visible: false,
      },
      {
        target: 2,
        visible: false
      },
      {
        target: 5,
        visible: false
      }
    ],
    data,
    "paging": false,
    "ordering": false,
    "info": false,
    "searching": false,
    order: [[4, 'desc']],
    columns
  });
}


function openNotepad(data) {
  fetch("Text\ Files/" + data[0])
    .then(response => response.text())
    .then(text => {
      $('#notepadTitle').text(data[0] + ' - Notepad');
      $('#notepadText').val(text);
    })

  openModal('notepadModal')
}
const recyclingRows = document.querySelectorAll("#recyclingTable tr");

recyclingRows.forEach(row => {
  row.addEventListener("click", () => {
    const cells = row.querySelectorAll("td");
    const rowData = Array.from(cells).map(cell => cell.textContent);

    openNotepad(rowData);
  });
});

const playlist = [
  "Songs/My\ Name\ Is\ Jonas.mp3",
  "Songs/No\ One\ Else.mp3",
  "Songs/The\ World\ Has\ Turned\ And\ Left\ Me\ Here.mp3",
  "Songs/Buddy\ Holly.mp3",
  "Songs/Undone\ -\ The\ Sweater\ Song.mp3",
  "Songs/Surf\ Wax\ America.mp3",
  "Songs/Say\ It\ Ain't\ So.mp3",
  "Songs/In\ The\ Garage.mp3",
  "Songs/Holiday.mp3",
  "Songs/Only\ in\ Dreams.mp3"
];

let currentTrack = 0;
const audio = new Audio(playlist[currentTrack]);

$("#playButton").on("click", function (e) {
  audio.play();
});

$("#pauseButton").on("click", function (e) {
  audio.pause();
});

$("#nextButton").on("click", function () {
  nextTrack();
});

function formatTitle(title){
  let text = title.split('/');
  return text[1].split('.')[0];
}

function nextTrack(){
  currentTrack = (currentTrack + 1) % playlist.length;
  audio.src = playlist[currentTrack];
  $("#title").val(formatTitle(playlist[currentTrack]));
  $("#track").val('0' + (currentTrack + 1));

  audio.play();
}

$("#prevButton").on("click", function () {
  currentTrack--;

  if (currentTrack < 0) {
    currentTrack = playlist.length - 1;
  }

  audio.src = playlist[currentTrack];

  $("#title").val(formatTitle(playlist[currentTrack]));
  $("#track").val('0' + (currentTrack + 1));

  audio.play();
});

audio.addEventListener("timeupdate", () => {
  let seconds = audio.currentTime;
  if (isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);

  $("#currentTime").text('[' + String(mins).padStart(2, "0") + "] : " + String(secs).padStart(2, "0") + ' : ' + String(ms).padStart(2, "0"));
});

audio.addEventListener("ended", nextTrack);

$(document).ready(async function () {
  $("#buttonTime").on("click", function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

  $(document).on("click", ".button--folder", function () {
    $(".button--folder").removeClass("selected");
    $(this).addClass("selected");
  });

  $(document).on("click", function(e) {
    if ($(e.target).closest(".button--folder").length === 0) {
      $(".button--folder").removeClass("selected");
    }
  });

  let inboxTable = await loadInboxTable('Emails/inbox.csv');

  $('#sentMail').on("click", async function(e) {
    inboxTable = await loadInboxTable('Emails/sent.csv');
  });

  $('#deletedMail').on("click", async function(e) {
    inboxTable = await loadInboxTable('Emails/deleted.csv');
  });

  $('#inboxMail').on("click", async function(e) {
    inboxTable = await loadInboxTable('Emails/inbox.csv');
  });

  function openEmail(rowData) {
    openModal('emailModal')

    let subjectHeader = document.getElementById("emailSubject");
    subjectHeader.innerHTML = rowData.Subject;

    $('#from').val(rowData.From);
    $('#date').val(rowData.Recieved);
    $('#to').val(rowData.To);
    $('#cc').val(rowData.CC);
    $('#subject').val(rowData.Subject);
    $('#message').val(rowData.Message);
  }

  inboxTable.on('click', 'tbody tr', function () {
    let data = inboxTable.row(this).data();
    console.log(data);
    openEmail(data);
  });
});
