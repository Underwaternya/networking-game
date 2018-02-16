let myGame = {    
  initializeGame: function() {
    myGame.initializeVars();
    this.setupNode(this.firstNode);
  },

  initializeVars: function() {
    this.firstNode = 0;
  },
  
  // give instructions to the intelligent monkey to construct blocks
  setupNode: function(nodeIndex) {
    let currentNode = nodes[nodeIndex]; // get current node index
    $('.link').unbind('click'); // prevent users to click another selection
    
    // there are only two types of nodes in source file nodes.js: question and ending. 
    // For questions, we will create 3 blocks after clicking 
    // (question itself, yes, no)
    // For endings, only one block will be created

    if (currentNode.type == 'question'){
      this.textLink(currentNode.text, currentNode.type, '', nodeIndex);
      this.textLink("yes", "yesNo", currentNode.kids[0], nodeIndex);
      this.textLink("no", "yesNo", currentNode.kids[1], nodeIndex);
    }

    if (currentNode.type == 'ending') {
      this.textLink(currentNode.text, currentNode.type, '', nodeIndex);
      // show retry button in 2s
      
      window.setTimeout(function() {
        myGame.textLink("Try again", "reset", '', nodeIndex);
      }, 2000);
    }
  },
  
  // how an intelligent monkey to create blocks, add content and links in HTML
  textLink: function(text, type, nextIndex, currentIndex) {
    // create block container
    let container = $('<div></div>');
    
    // create content and put it into the container
    let content = $('<button></button>')
      .addClass('link')
      .appendTo(container)
      .html(text);

    // generate the "choice" div during generating "yes" button
    if (text == "yes") {
      let choice = $('<div></div>')
        .addClass("block choice " + currentIndex)
        .appendTo("#content");
      container.addClass('yes');
    }

    // generate "no" button
    if (text == "no") {
      container.addClass('no');
    }

    // append buttons to the divs
    if (type == 'yesNo') {
      container.appendTo("."+ currentIndex);
    } else {
      container.appendTo('#content')
        .addClass('block ' + type);   
    }  

    // adding links to divs
    if (type == "reset") {
      content.click(function() {
        myGame.reset();
      })
    } else if (type == 'yesNo') {
      content.click(function(){
        myGame.setupNode(nextIndex);
        myGame.drawLine($('.'+ currentIndex), text);
      });
    }

    // scroll to the latest element (button of the page)
    $('html, body').animate({scrollTop:$(document).height()}, 'slow');
  },

  reset: function() {
    $('#content').html('');
    myGame.initializeGame();
  },

  drawLine: function(afterWhichDiv, yesOrNo) {
    let l;
    (yesOrNo == "yes" ? l = "110px" : l = "196px");
    let cssMap = {
      position: 'relative',
      'border-left': '1px dashed #000',
      height: '20px',
      top: '-9px',
      left: l,
    }
    $('<div></div>').css(cssMap).addClass('line').insertAfter(afterWhichDiv);
  }
};

$(document).ready(function(){
  myGame.initializeGame();
});