import React, { useEffect, useRef, useState } from 'react';
import { default as bgimg } from '../../../public/images/home.png';

const ScrollImage: React.FC = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Optional: stop observing after trigger
                }
            },
            { threshold: 0.5 },
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <p className="max-w-3xl px-12 pb-8 text-lg leading-relaxed">
                At Basit Ishaq Solutions, we pride ourselves on delivering a comprehensive suite of services tailored to meet the diverse needs of our
                clients. Our team of experienced professionals is dedicated to providing innovative solutions that drive growth and efficiency for
                your business. Whether you are a startup looking to establish your digital presence or an established enterprise seeking to optimize
                your operations, we have the expertise to help you succeed.
                <br />
                <br />
                Our core services include web development, mobile application development, UI/UX design, digital marketing, and cloud solutions. We
                leverage the latest technologies and industry best practices to ensure that every project we undertake meets the highest standards of
                quality and performance. From responsive websites and robust e-commerce platforms to intuitive mobile apps and engaging user
                interfaces, we deliver solutions that not only look great but also deliver measurable results.
                <br />
                <br />
                In addition to our technical services, we offer strategic consulting to help you identify opportunities for growth and innovation. Our
                team works closely with you to understand your unique challenges and objectives, crafting customized strategies that align with your
                vision and goals. We believe in building long-term partnerships with our clients, providing ongoing support and guidance to ensure
                your continued success.
                <br />
                <br />
                Explore our range of services below and discover how Basit Ishaq Solutions can help you achieve your business objectives. Contact us
                today to schedule a consultation and take the first step towards transforming your digital presence.
            </p>
            ;
            <img
                ref={imageRef}
                src={bgimg}
                alt="Scroll-triggered"
                className={`h-1/3 w-2/3 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-50 opacity-0'}`}
            />
        </div>
    );
};

export default ScrollImage;
