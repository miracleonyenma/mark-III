export const getTimeGreeting = () => {
  let hour = new Date().getHours();
  console.log(hour);
  if (hour < 7) return "morning, Early bird";
  else if (hour < 12) return "morning";
  else if (hour < 18) return "afternoon";
  else return "evening";
};
