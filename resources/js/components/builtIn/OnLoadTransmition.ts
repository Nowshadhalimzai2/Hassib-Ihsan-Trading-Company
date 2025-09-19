

 function OnLoadTransimition(setTransimited: React.Dispatch<React.SetStateAction<boolean>>, delay: number) {
        // Trigger the transition after the component mounts
        const timer = setTimeout(() => setTransimited(true), delay);
        return () => clearTimeout(timer);
    }
export default OnLoadTransimition;