function WelcomeContent() {
  return (
    <div className="h-screen flex items-center justify-center bg-primary">
      <div className="flex flex-col gap-2">
        <img src="./areeb.jpg" alt="" className="w-64 h-56" />
        <h1 className="text-orange-400 text-6xl font-semibold">
          Badawy-Events
        </h1>
        <p className="text-gray-300 text-sm mt-4">
          Let's make every moment memorable together!
        </p>
      </div>
    </div>
  );
}

export default WelcomeContent;
