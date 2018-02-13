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
    
    // there are only two types of nodes in source file nodes.js:  
    // question and ending. 
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
    

    // create links on yes/no buttons

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

    if (type == 'yesNo') {
      container.appendTo("."+ currentIndex);
      content.click(function(){
        myGame.setupNode(nextIndex);
      });
    } else {
      container.appendTo('#content')
        .addClass('block ' + type);   
    }  

    if (type == "reset") {
      $('.reset').click(function() {
        myGame.reset();
      })
    }

    // scroll to the latest element (button of the page)
    $('html, body').animate({scrollTop:$(document).height()}, 'slow');
  },

  reset: function() {
    $('#content').html('');
    myGame.initializeGame();
  }
};

$(document).ready(function(){
  myGame.initializeGame();
});