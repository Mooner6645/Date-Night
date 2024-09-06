var game = {
    board: [[null, null, null],
            [null, null, null],
            [null, null, null]],
    playerMark: "",
    aiMark: "",
    turnsPlayed: 0,
    playerTurn: true,
    nextMove: [null, null],
    winner: "",
    gameOver: false
  };
  
  var darkColor = "#2c3e50";
  
  var $narrativeOne = $("#game-narrative-one");
  var $narrativeTwo = $("#game-narrative-two");
  var $narrativeThree = $("#game-narrative-three");
  var $narrativeFour = $("#game-narrative-four");
  
  var computerThreats = ["Prepare to suffer extreme humiliation!",
                        "I will destroy you!",
                        "I am invincible!",
                        "You cannot defeat me!",
                        "You will be annihilated!",
                        "You will fail!",
                        "Fear me!",
                        "Vengeance is mine!",
                        "I hunger!"];
  
  var $identityBtn = $(".identity-cell");
  var $gameBtn = $(".game-cell");
  var $gameResetBtn = $("#game-reset-btn");
  
  $(document).ready(function() {
    $narrativeOne.hide();
    $narrativeTwo.hide();
    $narrativeThree.hide();
    $narrativeFour.hide();
    $("#header").hide();
    $("#game-configuration").hide();
    $("#game-grid").hide();
    $("#game-over").hide();
    
    $narrativeOne.fadeIn(500);
  });
  
  $("#narrative-one-btn").on('click', function() {
    var transitionPeriod = 500;
    $narrativeOne.fadeOut(transitionPeriod);
    setTimeout(function() {
      $narrativeTwo.fadeIn(transitionPeriod);
    }, transitionPeriod);
  });
  
  $("#narrative-two-btn").on('click', function() {
    var transitionPeriod = 500;
    $narrativeTwo.fadeOut(transitionPeriod);
    setTimeout(function() {
      $narrativeThree.fadeIn(transitionPeriod);
    }, transitionPeriod);
  });
  
  $("#narrative-three-btn").on('click', function() {
    var transitionPeriod = 500;
    $narrativeThree.fadeOut(transitionPeriod);
    setTimeout(function() {
      $("#tic-text").hide();
      $("#tac-text").hide();
      $("#doom-text").hide();
      $("#header").show();
      
      $("#tic-text").show();
      setTimeout(function(){
        $("#tac-text").show();
        setTimeout(function() {
          $("body").css("background-color", darkColor);
          $("#doom-text").show();
          
          setTimeout(function(){
            $("#game-configuration").fadeIn(transitionPeriod);
          }, transitionPeriod * 2);
        }, transitionPeriod * 2);
      }, transitionPeriod * 2);
    }, transitionPeriod * 2);
  });
  
  $identityBtn.on('click', function() {
    game.playerMark = $(this).attr("value");
    game.aiMark = (game.playerMark === "X") ? "O" : "X";
    
    startGame();
  });
  
  function startGame(){
    $("#game-configuration").hide();
    $("#game-grid").fadeIn(500);
    
    if (!game.playerTurn) aiPlay();
  }
  
  $gameBtn.on('click', function() {
    if (game.playerTurn) {
      var cell = $(this).attr("id");
      var row = parseInt(cell[1]);
      var col = parseInt(cell[2]);
  
      if (spaceFree(game.board, row, col)) {
        makePlay(game.playerMark, row, col);
        checkPlay(game.playerMark);
      }
    }
  });
  
  function aiPlay() {
    var aiThinkingDelay = 1000;
    setTimeout(function() {
      minimax(game, 0);
      makePlay(game.aiMark, game.nextMove[0], game.nextMove[1]);
      checkPlay(game.aiMark);
      
      var randThreat = computerThreats[Math.floor(Math.random() * computerThreats.length)];
      $("#computer-threat-text").text(randThreat);
      $("#computer-threat-text").fadeIn(250);
      setTimeout(function() {
        $("#computer-threat-text").fadeOut(250);
      }, 2000);
      
    }, aiThinkingDelay);
  }
  
  function checkPlay(mark) {
    if (hasWon()) {
      setTimeout(function() {
        gameOver(mark);
      }, 2000);
    } else if (game.turnsPlayed >= 9) {
      setTimeout(function() {
        gameOver("draw");
      }, 2000);
    } else {
      game.playerTurn = !game.playerTurn;
      if (!game.playerTurn) aiPlay();
    }
  }
  
  function spaceFree(board, row, col) {
    return (board[row][col] === null);
  }
  
  function makePlay(mark, row, col) {
    game.board[row][col] = mark;
    game.turnsPlayed++;
    
    var cellId = "#c" + row + "" + col;
    $(cellId).text(mark);
    $(cellId).addClass("cell-selected");
  }
  
  function minimax(state, depth){
    var gameState = JSON.parse(JSON.stringify(state));
    
    if (gameState.gameOver){
      return getScore(gameState, depth);
    } else {
      depth++;
      var moves = [];
      var scores = [];
      
      moves = generateAllAvailableMoves(gameState);
      
      for (var i = 0; i < moves.length; i++) {
        var possibleGameState = generatePossibleGame(gameState, moves[i]);
        scores.push(minimax(possibleGameState, depth));
      }
      
      if (gameState.playerTurn) {
        var maxScoreIndex = findIndexOfMax(scores);
        game.nextMove = moves[maxScoreIndex];
        return scores[maxScoreIndex]; 
      } else {
        var minScoreIndex = findIndexOfMin(scores);
        game.nextMove = moves[minScoreIndex]; 
        return scores[minScoreIndex];
      }
    }
  }
  
  function getScore(gameState, depth) {
    if (gameState.gameOver && gameState.winner === gameState.playerMark) {
      return 10 - depth;
    } else if (gameState.gameOver && gameState.winner === gameState.aiMark) {
      return depth - 10;
    } else {
      return 0;
    }
  }
  
  function generateAllAvailableMoves(gameState){
    const rowLength = 3;
    const colLength = 3;
    var availableMoves = [];
    
    for (var row = 0; row < rowLength; row++){
      for (var col = 0; col < colLength; col++){
        if (spaceFree(gameState.board, row, col)) {
          availableMoves.push([row, col]);
        }
      }
    }
    return availableMoves;
  }
  
  function generatePossibleGame(gameState, move) {
    var possibleGameState = JSON.parse(JSON.stringify(gameState));
    var row = move[0];
    var col = move[1];
    
    makePlay(possibleGameState.aiMark, row, col);
    possibleGameState.playerTurn = !possibleGameState.playerTurn;
    return possibleGameState;
  }
  
  function findIndexOfMax(array) {
    var max = Math.max.apply(null, array);
    return array.indexOf(max);
  }
  
  function findIndexOfMin(array) {
    var min = Math.min.apply(null, array);
    return array.indexOf(min);
  }
  
  function hasWon() {
    var winningCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[2, 0], [1, 1], [0, 2]]
    ];
  
    for (var i = 0; i < winningCombinations.length; i++) {
      var [a, b, c] = winningCombinations[i];
      if (game.board[a[0]][a[1]] && 
          game.board[a[0]][a[1]] === game.board[b[0]][b[1]] && 
          game.board[a[0]][a[1]] === game.board[c[0]][c[1]]) {
        game.winner = game.board[a[0]][a[1]];
        game.gameOver = true;
        return true;
      }
    }
    return false;
  }
  
  function gameOver(winner) {
    $("#game-grid").hide();
    $("#game-over").fadeIn(500);
    
    if (winner === "draw") {
      $("#game-end-heading").text("It's a Draw!");
      $("#game-end-subheading").text("No one wins.");
    } else if (winner === game.playerMark) {
      $("#game-end-heading").text("Congratulations!");
      $("#game-end-subheading").text("You win!");
    } else {
      $("#game-end-heading").text("Game Over!");
      $("#game-end-subheading").text("You lose!");
    }
  }
  
  $gameResetBtn.on('click', function() {
    location.reload();
  });
  