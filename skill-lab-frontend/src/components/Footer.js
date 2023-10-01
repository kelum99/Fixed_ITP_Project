import React from "react";
import "./StylesFooter.css";




export default function Footer(){
    return(
        <>
<footer>
<div class="footer">
	<div class="footer-content">

		<div class="footer-section about">
            <div>
			<h1 class="logo-text"><span>AutoCare</span>Insurance</h1>
			<h4 class="heading04">SKILL-LAB</h4><br/>
            </div>

			<div class="contact">
                <span>12/D,Edirisooriya Mawatha|colombo 07| Sri-Lanka.</span>
				<span><i class="fas fa-phone"></i>&nbsp; 071-481 3649</span>
				<span><i class="fas fa-envelope"></i>&nbsp; autocareinsuarence@gmail.com</span>
			</div>

			<div class="socials">
				<a href="#"><i class="fab fa-facebook"></i></a>
				<a href="#"><i class="fab fa-instagram"></i></a>
				<a href="#"><i class="fab fa-twitter"></i></a>
				<a href="#"><i class="fab fa-google"></i></a>
			</div>
		</div>
				

				

		<div class="footer-section links">
		
			<h2>Quick Links...</h2><br/>
			<ul>
			<a href="#"><li>Make Online Payment</li></a>
			<a href="#"><li>Make A Complaint</li></a>
			<a href="#"><li>Inquires</li></a>
			<a href="#"><li>Make A Claim</li></a>
			<a href="#"><li>Contact Us</li></a>
			<a href="#"><li>Terms & Conditions</li></a>
			</ul>
		</div>
		<div class="footer-section contact-form" align="right">
			<h2 align="center">Contact Us....</h2>
			<br/>
			<form action="index.html"method="post">
			<input type="email" name="email" class="text-input contact-input"  placeholder="your email....."pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"required /><br/><br/>
			<textarea name="message" class="text-input contact-input" placeholder="Your message....."></textarea><br/>
			<button  type="submit" class="btn btn-big" id="footer-btn" onclick="function sendFeedback(buttn1)">
				<i class="fas fa-envelope">  Send</i>
				
			</button>
            </form>
		</div>
		
	</div>






<div class="footer-bottom">
	&copy; Allright reserved by | SKILL-LAB
</div>
</div>
</footer>

</>
    );
}