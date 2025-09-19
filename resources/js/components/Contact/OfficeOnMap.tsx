const OfficeOnMap = () => {
    return (
        <>
            <iframe
                title="Main Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.67941884085346!2d70.45486086291581!3d34.43003928963054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38da070038acf96b%3A0x93b85346e21031ed!2z2YHYsdmK2K8g2YbYrNuM2Kgg2YXYp9ix2qnYqg!5e0!3m2!1sen!2s!4v1750529492454!5m2!1sen!2s"
                width="100%"
                height="350"
                className="rounded-lg shadow-lime-400 outline-2 outline-gray-300 transition-all duration-300 hover:border-1 hover:border-lime-400 hover:shadow-lg"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </>
    );
};

export default OfficeOnMap;
