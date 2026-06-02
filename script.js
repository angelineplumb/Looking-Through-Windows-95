let highestZ = 1000;

function openModal(id) {
  $("#" + id).show()
  $("#" + id).css("z-index", ++highestZ);
}

document.getElementById("inboxButton").addEventListener("dblclick", () => {
  openModal('passwordModal');
});

document.getElementById("helpButton").addEventListener("dblclick", () => {
  openModal('welcomeModal');
  $("#startModal").hide()
});

document.getElementById("closeWelcomeButton").addEventListener("click", () => {
  $("#welcomeModal").hide()
});

document.getElementById("inboxStartButton").addEventListener("dblclick", () => {
  openModal('passwordModal');
  $("#startModal").hide()
});

document.getElementById("okButton").addEventListener("click", () => {
  $("#computerModal").hide()
});

document.getElementById("computerButton").addEventListener("dblclick", () => {
  openModal('computerModal');
});

document.getElementById("okNetworkButton").addEventListener("click", () => {
  $("#networkModal").hide()
});

document.getElementById("networkButton").addEventListener("dblclick", () => {
  openModal('networkModal');
});

document.getElementById("notepadButton").addEventListener("dblclick", () => {
  $('#notepadTitle').text('Untitled - Notepad');
  $('#notepadText').val('');
  openModal('notepadModal');
});

document.getElementById("recyclingButton").addEventListener("dblclick", () => {
  openModal('recyclingModal');
});

document.getElementById("recyclingStartButton").addEventListener("dblclick", () => {
  openModal('recyclingModal');
  $("#startModal").hide()
});

document.getElementById("paintButton").addEventListener("dblclick", () => {
  openModal('paintModal');
});

document.getElementById("musicButton").addEventListener("dblclick", () => {
  openModal('musicModal');
});

document.getElementById("musicStartButton").addEventListener("dblclick", () => {
  openModal('musicModal');
  $("#startModal").hide()
});

$(document).on("mousedown", ".modal, .modal *", function() {
  $(this).closest(".modal").css("z-index", ++highestZ);
});

let counter = 0;
function makeFolderModal($this){
  let newModalID = 'folderModal-' + counter; 
  let thisText = $($this[0].childNodes[2]).text();
  thisText = thisText == '' ? $($this[0].childNodes[1]).text() : thisText;
  var $modal = $('<div id="folderModal" class="modal" style="width: 525px"></div');
  var $modalContent = $('<div class="modal-content"></div>');
  var $modalHeader = $('<div class="modal-header" style="justify-content: left;"></div');

  var $header = $('<h6 style="padding-left: 10px;" id="folderTitle-' + counter + '"></h6>');
  var $span = $('<span class="close">&times;</span>')
  var $modalBody = $('<div class="modal-body" style="text-align: left; padding:1px 1px 20px 1px"></div>');
  var $modalOptions = $('<div style="display: flex; justify-content: flex-start; padding-left: 5px; margin: 0px; width:525px; border: 2px outset lightgray; border-top: none;"><p style="padding-right: 15px; margin-top: 0px; margin-bottom: 2px;"><u>F</u>ile</p><p style="padding-right: 15px;  margin-top: 0px; margin-bottom: 2px;"><u>E</u>dit</p><p style="padding-right: 15px;  margin-top: 0px; margin-bottom: 2px;"><u>V</u>iew</p><p style="padding-right: 15px;  margin-top: 0px;margin-bottom: 2px;"><u>H</u>elp</p></div>');
  var $modalContainer = $('<div class="container" style="display: flex; margin-top: 25px; justify-content: center;"></div>');
  var $folderButton = $('<button class="button--folder folder" type="button" style="text-align: center;"><img src="Icons/Folder.ico" alt="Icon"><span class="button-text" style="color: black;"></span></button>')
  var $puzzleButton5 = $('<button class="button--folder folder" type="button" style="text-align: center;" id ="morePasswords"><img src="Icons/Notepad\ document.ico" alt="Icon"><span class="button-text" style="color: black;"></span></button>')

  let buttonNameArray = [];
  let natoAlphabet = 'Alpha,Bravo,Charlie,Delta/Echo,Foxtrot,Golf,Hotel/India,Juliette,Kilo,Lima/Mike,November,Oscar,Papa/Quebec,Romeo,Sierra,Tango/Uniform,Victor,Whisky,Xray/Whiskey,Xray,Yankee,Zulu/More Passwords';
  let natoAlphArray = natoAlphabet.split('/');
  for(let i = 0; i < natoAlphArray.length - 1; i++){
    if(natoAlphArray[i].includes(thisText)){
      let index = i > 1 ? i - 2 : i + 5;
      buttonNameArray = natoAlphArray[index];
    }
  }

  let length = $this.attr('id') != undefined && $this.attr('id') == 'puzzleButton4' ? 1 : 4;
  console.log($this.attr('id'));
  for(let i = 0; i < length; i++){
    let id = "";
    let puzzleIndexes = [
      [5, 0],
      [3, 1],
      [3, 1],
      [6, 2],
      [7, 0]
    ]
    if($this.attr('id') != undefined && $this.attr('id').includes('puzzleButton')){
      let j = $this.attr('id').split('n')[1];
      buttonNameArray = natoAlphArray[puzzleIndexes[j][0]];
      if(i == puzzleIndexes[j][1]){
        id = "puzzleButton" + (Number(j) + 1)
      }
    }
    $newButton = $folderButton.clone(true);
    if(id == 'puzzleButton5'){
      $newButton = $puzzleButton5.clone(true);
      $newButton.removeClass("folder")
      $newButton.addClass("passwordNote")
    }
    let names = buttonNameArray.split(',');
    $($newButton[0].childNodes[1]).text(names[i]);
    $newButton.attr('id', id);
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
    scrollY: '180px',
    scrollCollapse: true,
    paging: false,
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
  "Audio/My\ Name\ Is\ Jonas.mp3",
  "Audio/No\ One\ Else.mp3",
  "Audio/The\ World\ Has\ Turned\ And\ Left\ Me\ Here.mp3",
  "Audio/Buddy\ Holly.mp3",
  "Audio/Undone\ -\ The\ Sweater\ Song.mp3",
  "Audio/Surf\ Wax\ America.mp3",
  "Audio/Say\ It\ Ain't\ So.mp3",
  "Audio/In\ The\ Garage.mp3",
  "Audio/Holiday.mp3",
  "Audio/Only\ in\ Dreams.mp3"
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

$(document).on("dblclick", ".passwordNote", function () {
  fetch("Text\ Files/More-Passwords.txt")
      .then(response => response.text())
      .then(text => {
        $('#notepadTitle').text('More-Passwords.txt - Notepad');
        $('#notepadText').val(text);
      })

    openModal('notepadModal')
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
  const audio = new Audio("Audio/Windows 95 Startup Sound.mp3");
  audio.play();

  $('#restartButton').on('dblclick', function(event) {
    location.reload();
  });

  $('#startButton').on('click', function(event) {
    if ($('#startModal').is(':visible')) {
      $("#startModal").hide()
    }
    else{
      event.stopPropagation();
      $("#startModal").show()
    }
  });

  let hints = [
    "Some deleted documents are located in the recycling bin.",
    "The Paint application shows a cute drawing and some possibly improtant information.",
    "This computer's owner liked to use the NATO alphabet to spell things out.",
    "You can switch between different folders in the Inbox application."
  ]
  $("#hintButton").on("click", function() {
    let index = 0;
    for(let i = 0; i < hints.length; i++){
      if(hints[i] == $("#hintText").text()){
        index = i == 3 ? 0 : i + 1;
        break;
      }
    }
    console.log(index);
    $("#hintText").text(hints[index]);
  });

  $("#aboutButton").on("click", function() {
    var url = "https://sites.google.com/view/looking-through-windows95/home";
    window.open(url, '_blank');
  });

  $("#fullscreenButton").on("click", function() {
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

  $(document).on('click', function(event) {
    var $modalContainer = $('#startModal'); 
    var $startButton = $('#startButton'); 
    if (!$modalContainer.is(event.target) && $modalContainer.has(event.target).length === 0 &&
    !$startButton.is(event.target)) {
      $('#startModal').hide();
    }
  });

  let inboxCSV = 'Emails/inbox.csv';
  let sentCSV = 'Emails/sent.csv';
  let deletedCSV = 'Emails/deleted.csv';
  let inboxTable = await loadInboxTable(inboxCSV);
  $('#submitButton').on("click", async function(e) {
    if ($('#emailUsername').val() == 'stevethompson@aol.com' && $('#password').val() == 'weezer') {
      inboxCSV = 'Emails/inbox.csv';
      sentCSV = 'Emails/sent.csv';
      deletedCSV = 'Emails/deleted.csv';
      inboxTable = await loadInboxTable(inboxCSV);
      var inboxModal = document.getElementById("inboxModal");
      inboxModal.style.display = "block";
      document.getElementById("passwordModal").style.display = "none";
      document.getElementById("incorrect").style.display = "none";
    }
    else if($('#emailUsername').val() == 'steventurner@aol.com' && $('#password').val() == 'peppercorns'){
      inboxCSV = 'Emails/otherInbox.csv';
      sentCSV = 'Emails/otherSent.csv';
      deletedCSV = 'Emails/otherDeleted.csv';
      inboxTable = await loadInboxTable(inboxCSV);
      var inboxModal = document.getElementById("inboxModal");
      inboxModal.style.display = "block";
      document.getElementById("passwordModal").style.display = "none";
      document.getElementById("incorrect").style.display = "none";
    }
    else{
      document.getElementById("incorrect").style.display = "inline";
    }
  });

  $('#sentMail').on("click", async function(e) {
    inboxTable = await loadInboxTable(sentCSV);
  });

  $('#deletedMail').on("click", async function(e) {
    inboxTable = await loadInboxTable(deletedCSV);
  });

  $('#inboxMail').on("click", async function(e) {
    inboxTable = await loadInboxTable(inboxCSV);
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
