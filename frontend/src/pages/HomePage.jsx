
const HomePage = () => {
  const userId = localStorage.getItem('userId');

  return (
    <div className="min-h-screen flex items-center justify-center">
      {userId ? (
        <h1 className="text-3xl">Welcome to book store.</h1>
      ) : (
        <h1 className="text-3xl">Please <a href="/login" className="text-blue-500 underline">Login</a> first.</h1>
      )}
    </div>
  );
};

export default HomePage;
