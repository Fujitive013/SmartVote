const getGreeting = () => {
  const now = new Date();
  const phTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  );
  const hour = phTime.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

export default getGreeting;
