console.log('Images and content adapted from the Federal Reserve Bank of Richmonds "Dollars and Sense" publication. Coded and developed by Anmol Mital, MLWGS Class of 2023. Educational Purposes Only. Copyright Climate and Money 2021.')    
    
        var wheelTile;
        var data = [];
        function popup(box, category) {
            document.querySelectorAll('audio').forEach(e => {
                e.currentTime = 0;
                e.pause();
            } );
            if($(box).attr("highlight")==="yes") {
                $(category).dialog({
                    modal: true,
                    width: 1000, 
                    position: {my: "center", at: "center", collision: "flip"},
                });
            } else {
                alert("Please click on the highlighted box instead!")
            };
        };
        
       //var wheelMap = new Map();
        function calculate(category, income, expense, bond) {
         var result =  confirm("Are you sure you want to choose your income as " + income + " and your expense as $ " + expense + " with a bond with a " +bond);
         var calValue = (income - expense) * bond;
         console.log(result);       
        }
        function updateUI(category, calValue, expense) {
        var cellId = "#" + category + "Select-cell";
        var expenseCell = "#" + category + "Expense-cell";

        $(cellId).text(calValue);
        $(expenseCell).text(expense);

        $("#" + category + "Select").dialog("close");
    }
        function highlight(box) {
           document.querySelectorAll('audio').forEach(e => {
            e.currentTime = 0;
            e.pause();
           }); 
           
           $(box).attr("highlight", "no");
            
            var locationId = Number($(box).attr("location-id"));
            var nextId = locationId + 1;
            
            if(nextId===17) {
                endGame();
            }
            else {
                $(box).addClass("hiddenSquare");
                var boxId = document.querySelectorAll('[location-id="'+nextId+'"]');
                console.log(boxId);
                $(boxId).attr("highlight", "yes");
                wheelTile = null; 
            }
            
        }

        /*  Saving reference of the tile that called Wheel of Fortune.
            Will be using this reference later to call highlight when we are about to close the modal using closeWheel() function */
        function setWheelTile(box) {
            wheelTile = box;
        }
        
        function decide (category, choice, price, earn, box) {
            if(earn) {
                text = "earn";
                sign = "+";
            } else {
                text = "cost";
                sign = "-";
            };
            var result = confirm("Are you sure you want to choose " + choice + "? This will " + text + " $" + price + ".")
            if(result == true) {
                data.push([category, choice, price, earn]);
                var cellText = sign + price; 
                var cellId = category + "-cell";
                $(cellId).text(cellText);
                $(category).dialog("close");
                highlight(box);
            };
        };
        
        function invest(box) {
            var investAmount = document.getElementById("investAmount").value;
            investAmount = investAmount == '' ? 0 : Number(investAmount);
            var realAmount = Number(investAmount);
            console.log(typeof realAmount);
            
            if(realAmount>100000) {
                alert("Please choose a value less than $1,500.")
            } else {
                data.push(['#invest', investAmount, realAmount, false]);
                const button = document.getElementById('submitAmount')
                button.disabled = true;
                $("#invest1-cell").text("-" + investAmount);

                var nextAmount = 100000 - realAmount; 
                var paraText = "You have already invested $" + realAmount + " so you can only invest $" + nextAmount + " more.";
                $("#previous-amount").text(paraText);
                var possibleStringAmount = "'" + nextAmount + "'";
                $("#investAmount2").attr("max", possibleStringAmount);
                $("#invest").dialog("close");
                highlight(box);
            }
        };
        
        function investTwo(box) {
            var previousAmount = data[4][2];
            var possibleAmount = 1500 - previousAmount;
            var amountInvested = document.getElementById("investAmount2").value;
            amountInvested = amountInvested == '' ? 0 : Number(amountInvested);
            
            var numberAmount = Number(amountInvested);
            if(numberAmount > possibleAmount) {
                alert("Last time you invested $" + previousAmount + ". Please invest less than $" + possibleAmount + ".")
            } else {
                data.push(['#invest2', amountInvested, numberAmount, false]);
                $("#invest2-cell").text("-" + numberAmount)
                const lastButton = document.getElementById('submitInvest')
                lastButton.disabled = true;
                $("#invest2").dialog("close");
                highlight(box);
            }
        };

        // function communication(box) {
        //     var val = [];
        //     $(':checkbox:checked').each(function(i){
        //         val[i] = Number($(this).val());
        //     });
        //     var sum = 0;
        //     for (var a = 0; a < val.length; a++) {
        //         sum += val[a];
        //         $("#commSelect-cell").text("-" + sum);
        //         data.push(["#commSelect", "mc", sum, false]);
        //         $("#commSelect").dialog("close");
        //         highlight(box);
        //     }
        // };
        
        function endGame() {
            var investInterest1 = Math.round(100*(1.2 * Number(Math.abs($("#invest1-cell").text()))))/100;
                $("#invest1Cell").text("+" + investInterest1);
            var investInterest2 = Math.round(100*(1.2 * Number(Math.abs($("#invest2-cell").text()))))/100;
                $("#invest2Cell").text("+" + investInterest2);
            var saveInterest = Number(Math.abs($("#saveSelect-cell").text()));;
                $("#saveSelectCell").text("+" + saveInterest);
            var newCenterText = " Thanks for playing! Please fill out our <a href='https://docs.google.com/forms/d/e/1FAIpQLSf5Lj41OwhodWVeYB6e0hxRSgYAHjNR7Gf-ovGwAEb3LUYAOA/viewform?usp=sf_link' target='_blank'>Feedback Form</a> so we can continue to improve the game."
            console.log("end");
            
            var earnSum = 0;
            $(".earncell").each(function() {
                earnSum += Number($(this).text());
                $("#incomeTotal").text("+$" + earnSum);
            });;
            
            var expenseSum = 0;
            var posVar = 0;
            $(".expensecell").each(function() {
                expenseSum += Number($(this).text());
                posVar = Math.round(100*(Math.abs(expenseSum)))/100;
                $("#expenseTotal").text("-$" + posVar)
            });;
            var totalText;
            var aText;
            var totalValue = earnSum + expenseSum;
            if (posVar < earnSum) {
                totalText = "+$";
                aText = " You earned more than you spent! You are on track to a well-balanced budget!"
                document.getElementById("main-page-audio-small").src = "audio/ending-earned-more-than-spent-audio.m4a";
                document.getElementById("main-page-audio").src = "audio/ending-earned-more-than-spent-audio.m4a";
            } else if(posVar > earnSum) {
                totalText = "-$";
                aText = " You spent more than you earned. Next time, you may want to spend less to avoid debt."
                document.getElementById("main-page-audio-small").src = "audio/ending-spent-more-than-earned.m4a";
                document.getElementById("main-page-audio").src = "audio/ending-spent-more-than-earned.m4a";
            }
            $("#totalCell").text(totalText + totalValue);
            $(".game-desc-text").html(aText + newCenterText);
            //$("#formLink").attr("href", "https://docs.google.com/forms/d/e/1FAIpQLSf5Lj41OwhodWVeYB6e0hxRSgYAHjNR7Gf-ovGwAEb3LUYAOA/viewform?usp=sf_link");
            //$("#formLink").text("Feedback Form");
        }
        
        function unexpectedEvent(box, category) {
            var divname = "#unexpectedSelect1"; 
            if($(box).attr("highlight")==="yes") {
                $(divname).dialog({
                    width: 1000, 
                    position: {my: "center", at: "center", collision: "flip"},
                });
            } else {
                alert("Please click on the highlighted box instead!")
            };
            
            var randomValue = Math.floor(Math.random()*10);
            // var heads = document.getElementById("heads");
            // var tails = document.getElementById("tails");
            $("#heads").unbind("click");
            $("#tails").unbind("click");
            if (randomValue < 2) {
                $("#unexpectedText").text("Life brings unexpected events. Flip a coin: if heads, a hurricane hits and you have to pay $1300 to repair your roof. If tails, your mother deposits $200 per month in your bank account.");
                    $("#heads").click(function(){
                        data.push([category, 'heads', 1300, false]); 
                        var cellId = category + "-cell";
                        $(cellId).text("-1300");
                        $(divname).dialog("close");
                        highlight(box);
                    });
                    $("#tails").click(function() {
                        data.push([category, 'tails', 200, true])
                        var cellId = category + "Cell";
                        $(cellId).text("+200");
                        $(divname).dialog("close");
                        highlight(box);
                    });
            } else if(randomValue < 4) {
                $("#unexpectedText").text("Life brings unexpected events. Flip a coin: if heads, you messed up your taxes and owe $1200. If tails, you won a contest and receive $600.");
                    $("#heads").click(function(){
                        data.push([category, 'heads', 1200, false]); 
                        var cellId = category + "-cell";
                        $(cellId).text("-1200");
                        $(divname).dialog("close");
                        highlight(box);
                    });
                    $("#tails").click(function() {
                        data.push([category, 'tails', 600, true])
                        var cellId = category + "Cell";
                        $(cellId).text("+600");
                        $(divname).dialog("close");
                        highlight(box);
                    });
            } else if(randomValue < 6) {
                $("#unexpectedText").text("You invested in a car company. Flip a coin: if heads, you earned $1000. If tails, you lost $500.");
                    $("#heads").click(function(){
                        data.push([category, 'heads', 1000, true]); 
                        var cellId = category + "Cell";
                        $(cellId).text("+1000");
                        $(divname).dialog("close");
                        highlight(box);
                    });
                    $("#tails").click(function() {
                        data.push([category, 'tails', 500, false])
                        var cellId = category + "-cell";
                        $(cellId).text("-500");
                        $(divname).dialog("close");
                        highlight(box);
                    });
            } else if(randomValue < 7) {
                $("#unexpectedText").text("Life brings unexpected events. Flip a coin: if heads, you forgot to pay your water bill and owe $300. If tails, you sold an old TV and gained $400.");
                    $("#heads").click(function(){
                        data.push([category, 'heads', 300, false]); 
                        var cellId = category + "-cell";
                        $(cellId).text("-300");
                        $(divname).dialog("close");
                        highlight(box);
                    })
                    $("#tails").click(function() {
                        data.push([category, 'tails', 400, true])
                        var cellId = category + "Cell";
                        $(cellId).text("+400");
                        $(divname).dialog("close");
                        highlight(box);
                    });
            } else if(randomValue < 8) {
                $("#unexpectedText").text("Life brings unexpected events. Flip a coin. If heads, your bank account was robbed and you lost $2000. If tails, the state government gave you $1500 for installing solar panels on your roof.");
                    $("#heads").click(function(){
                        data.push([category, 'heads', 2000, false]); 
                        var cellId = category + "-cell";
                        $(cellId).text("-2000");
                        $(divname).dialog("close");
                        highlight(box);
                    });
                    $("#tails").click(function() {
                        data.push([category, 'tails', 1500, true])
                        var cellId = category + "Cell";
                        $(cellId).text("+1500");
                        $(divname).dialog("close");
                        highlight(box);
                    });
            } else if(randomValue < 9) {
                $("#unexpectedText").text("Life brings unexpected events. Flip a coin: if heads, you dropped your phone in a pond and you must pay $500 to repair it. If tails, you start a part time photography business and get $2000 from a wedding.");
                    $("#heads").click(function(){
                        data.push([category, 'heads', 500, false]); 
                        var cellId = category + "-cell";
                        $(cellId).text("-500");
                        $(divname).dialog("close");
                        highlight(box);
                    });
                    $("#tails").click(function() {
                        data.push([category, 'tails', 2000, true])
                        var cellId = category + "Cell";
                        $(cellId).text("+2000");
                        $(divname).dialog("close");
                        highlight(box);
                    });
            } else {
                $("#unexpectedText").text("Life brings unexpected events. Flip a coin: if heads, you misplaced $300. If tails, your grandmother gave $60.");
                    $("#heads").click(function(){
                        data.push([category, 'heads', 300, false]); 
                        var cellId = category + "-cell";
                        $(cellId).text("-300");
                        $(divname).dialog("close");
                        highlight(box);
                    });
                    $("#tails").click(function() {
                        data.push([category, 'tails', 60, true])
                        var cellId = category + "Cell";
                        $(cellId).text("+60");
                        $(divname).dialog("close");
                        highlight(box);
                    });
            };
        };
    //Wheel of fortune
        const sectors = [
          {color:"#f82", label:"Pay $20"},
          {color:"#0bf", label:"Pay $20"},
          {color:"#fb0", label:"Pay $20"},
          {color:"#0fb", label:"Pay $20"},
          {color:"#b0f", label:"Pay $20"},
          {color:"#f0b", label:"$1500"},
          {color:"#bf0", label:"Pay $20"},
        ];
        const rand = (m, M) => Math.random() * (M - m) + m;
        const tot = sectors.length;
        const EL_spin = document.querySelector("#spin");
        const ctx = document.querySelector("#wheel").getContext('2d');
        const dia = ctx.canvas.width;
        const rad = dia / 2;
        const PI = Math.PI;
        const TAU = 2 * PI;
        const arc = TAU / sectors.length;

        const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
        let angVel = 0; // Angular velocity
        let ang = 0; // Angle in radians

        const getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;

        function drawSector(sector, i) {
          const ang = arc * i;
          ctx.save();
          // COLOR
          ctx.beginPath();
          ctx.fillStyle = sector.color;
          ctx.moveTo(rad, rad);
          ctx.arc(rad, rad, rad, ang, ang + arc);
          ctx.lineTo(rad, rad);
          ctx.fill();
          // TEXT
          ctx.translate(rad, rad);
          ctx.rotate(ang + arc / 2);
          ctx.textAlign = "right";
          ctx.fillStyle = "#fff";
          ctx.font = "bold 20px sans-serif";
          ctx.fillText(sector.label, rad - 10, 10);
          //
          ctx.restore();
        };

        function rotate() {
          const sector = sectors[getIndex()];
          ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
          EL_spin.textContent = !angVel ? "SPIN" : sector.label;
          EL_spin.style.background = sector.color;
        }
        function closeWheel() {
            highlight(wheelTile);
            $("#wheelOfFortune").dialog("close");
        }
        var wheelNumber = 0;
        function frame() {
          if (!angVel) return;
          angVel *= friction; // Decrement velocity by friction
          if (angVel < 0.002) {
              var wheelValue = determineValue(ang);
              wheelNumber = wheelNumber + 1;
              
              if(wheelValue == 1500) {
                  var accept = confirm("Congratulations! You won $1500!");
                  if(accept===true) {
                      closeWheel();
                  } else if (accept===false) {
                      closeWheel();
                  }
                  data.push(['wheel', 'won', wheelValue, true]);
                  var cellId = "#wheelOfFortune" + wheelNumber.toString() + "PLUScell";
                  $(cellId).text("+1500");
              } else {
                  var accept = confirm("Sorry, you lost $20.");
                  if(accept===true) {
                      closeWheel();
                  } else if (accept===false) {
                      closeWheel();
                  }
                  data.push(['wheel', 'lost', wheelValue, false]);
                  var cellId = "#wheelOfFortune" + wheelNumber.toString() + "-cell";
                  $(cellId).text("-20");
              }
              angVel = 0;
        // Bring to stop
          }
          ang += angVel; // Update angle
          ang %= TAU; // Normalize angle
          rotate();
        }

        function engine() {
          frame();
          requestAnimationFrame(engine)
        }

        // INIT
        sectors.forEach(drawSector);
        rotate();
        engine();
        EL_spin.addEventListener("click", () => {
          if (!angVel) angVel = rand(0.25, 0.35);
        });
        
        function determineValue(ang) {
            if(ang > 0 && ang <= 0.897) {
                return 20;
            }

            if(ang > 0.897 && ang <= 1.794) {
                return 1500;
            }
            if(ang > 1.794 && ang<=2.691) {
                return 20;
            }
            if(ang > 2.691 && ang <=3.589) {
                return 20;
            }
            if(ang > 3.589 && ang<=4.486) {
                return 20;
            }
            if(ang > 4.486 && ang<=5.383) {
                return 20;
            }

            if(ang>5.383) {
                return 20;
            }
        }

        function controlAudio(playerID, hide, show, state) {
            document.getElementById(hide).style.display = "none";
            document.getElementById(show).style.display = "inline";
            if(state === 'play') {
                document.getElementById(playerID).play();
            }
            else {
                document.getElementById(playerID).pause();
            }
        }

        $(document).ready(function(){
            $('#wheelOfFortune').hide();
        });
        