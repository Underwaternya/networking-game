function Start_Dinner_1(){

	/////// SET UP SCENE ////////

	Show("background","dinner");
	Show("clock","clock_ticking",{x:155,y:294});
	Show("clock_time","clock_1855",{x:155+5,y:294+37});
	Show("nicky","dinner_nicky_sit",{x:0,y:300});
	Show("dad",null,{x:0,y:300});
	Show("mom",null,{x:0,y:300});
	Show("table","dinner_table",{x:0,y:420});

	PlaySound("clock","dinner_ticking",{loop:-1});

	////////////////////////////

	Wait(2500);
	N("Hello Hello!");
	N("Are you online?");

	Choose({
		"I'm here.": function(message){
			$.waiting_action = "eat";
			Free(message);
		},
		"No I'm not.": function(message){
			$.waiting_action = "wait";
			Free(message);
		}
	});
}

function Free(message){
	
	$.what_you_called_out = message;
	p(message);

	N(". . .");
	N("I really need your help!");
	N("I am in a great, great challenge of my life....");
	N("It's important...absolutely...but I am not confident in the issue...");
	N("I don't think I could handle it independently without you...");
	N("You gonna help me, right? You are my best friend!");

	Choose({
		"Ok I will help you. But... what's going on indeed?": function(message) {
			Introduction(message);
		},
		"Sorry, I'm not your friend.": function(message) {
			PlayAgain(message);
		},
	})
	

}

function Introduction(message){
	
	p(message);
	p(". . .");
	N("A really, really important job fair in my professional area.");
	N("I am in my last university year, you know...");
	N("The job fair could be essential for getting employed")


	// Show("clock","clock_meowing");
	// Show("clock_time","clock_1900");
	// Wait(1000);

	// Show("nicky","dinner_nicky_defiant");

	Choose({
		"That's great": function(message){
			n(message);

			// Show("mom","mom_stand");
			// Show("clock","clock_ticking");

			if($.im_a_poet){
				m("Did you learn poetry from a friend?");
			}else{
				m("Poetic.");
			}

			Show("nicky","dinner_nicky_sit");
			n("Oh, hey mom.");
			
			Waiting_End();
		},
		"That's not bad": function(message){
			n(message);

			Show("mom","mom_stand");
			Show("clock","clock_ticking");

			m("Your grandfather gave it to us.");

			Show("nicky","dinner_nicky_sit");
			n("Oh! Hey mom.");
			
			Waiting_End();
		},
		"Meow? Meow? Meow? Meow?": function(message){
			
			N("Meow.");
			N("Meow!");

			// Show("nicky","dinner_nicky_outrage");
			n("MEOW!");

			// Show("mom","mom_stand");

			m("Nick, what are you doing?...");

			// Show("clock","clock_ticking");
			// PlaySound("clock","dinner_ticking",{loop:-1});
			// Show("nicky","dinner_nicky_sit");

			n("MEOOOhhhh didn't see you. Ahem. Hey mom.");

			Waiting_End();
		}
	});

}

function Waiting_End(){
	Start_Dinner_2();
}