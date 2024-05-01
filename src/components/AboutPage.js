import React from 'react';
import Slider from 'react-slick';

function AboutPage() {
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 2000,  
    slidesToShow: 1,  
    slidesToScroll: 1,  
    autoplay: true,  
    autoplaySpeed: 5000, 
    arrows: true  
  };

  return (
    <div className='  min-h-[100vh]  h-[100vh]  grid grid-cols-2 relative'>
      <div className=' col-span-1 hidden lg:flex'>
        <div className=' hidden lg:flex w-full  relative px-6'>
          <img className="w-full max-w-full max-h-full object-cover" src='../assets/images/aboutus.jpg' alt="Swimming Course" />
        </div>
      </div>
      <div className=' mt-10 col-span-2 lg:col-span-1 text-center px-6 space-y-6 flex flex-col justify-center items-center'>     
        <div className=' text-center px-6 w-full space-y-6'>
        <h1>About Us</h1> 
        <Slider {...settings}>
          <div className=' flex flex-col space-y-[6px]'>
            <h3>Vision</h3>
            <p>Our vision is to empower individuals of all ages with the essential life skill of swimming. We aspire to create a world where everyone feels confident, safe, and joyful in the water. By striving for excellence in aquatic education and instruction, we aim to foster a deep-seated love and appreciation for swimming.</p>
          </div>
          <div className=' flex flex-col space-y-[6px]'>
            <h3>Mission</h3>
            <p>At Swim Empowerment, our mission is to provide comprehensive swimming instruction in a safe, supportive, and inclusive environment. Through personalized coaching and innovative teaching methods, we are dedicated to equipping our students with the necessary skills and knowledge to become proficient swimmers. Furthermore, we are committed to promoting water safety awareness and cultivating a lifelong passion for swimming among our participants.</p>
          </div>
          <div className=' flex flex-col space-y-[6px]'>
            <h3>Commitment to Excellence</h3>
            <p>We believe that every individual has the potential to excel in swimming with the right guidance and support. Our experienced instructors are passionate about aquatic education and are dedicated to providing the highest level of instruction. They use a blend of traditional techniques and innovative approaches tailored to meet the needs and learning styles of each student. This personalized attention ensures that students of all skill levels achieve and often exceed their swimming goals.</p>
          </div>
          <div className=' flex flex-col space-y-[6px]'>
            <h3>Community and Inclusion</h3>
            <p>An integral part of our philosophy is the belief in building a strong, supportive community around our swimming programs. We actively engage with local communities to promote water safety and provide accessible swimming lessons to underserved populations. We believe that swimming is a vital skill that should be accessible to everyone, regardless of socioeconomic background or ability. Our scholarship programs and community outreach initiatives are just a few ways we strive to break down barriers to aquatic participation.</p>
          </div>
          <div className=' flex flex-col space-y-[6px]'>
            <h3>Environmental Stewardship</h3>
            <p>Understanding and respecting our aquatic environments are vital parts of our curriculum. We teach our students the importance of conservation and the role they can play in protecting our waterways. By instilling a sense of environmental stewardship, we hope to contribute to the sustainability of aquatic habitats and the broader ecosystem.</p>
          </div> 
          <div className=' flex flex-col space-y-[6px]'>             
             <p>By embracing these principles, we continue to lead and innovate in the field of aquatic education, providing valuable skills that last a lifetime while also contributing to the well-being and safety of our communities.</p>
          </div>  
        </Slider>       
        </div>
      </div>        
    </div>
  );
}

export default AboutPage;
