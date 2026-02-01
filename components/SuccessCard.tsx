import React from 'react';

export const SuccessCard: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border-4 border-pink-200 animate-fade-in-up">
      <div className="mb-6 rounded-xl overflow-hidden shadow-lg mx-auto w-full max-w-[300px]">
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2QzM2M4YjY5NTI0MzY5NzM3YzM5ZDY4OWU4NmQ2OWM3ZjI5MzM2MSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/T86i6yDyOYz7J6dPhf/giphy.gif" 
          alt="Celebration"
          className="w-full h-auto object-cover"
        />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4 animate-bounce">
        YAY!!! 💖
      </h1>
      
      <p className="text-xl text-gray-700 mb-6">
        I knew you would say yes! <br/> Can't wait for our date! 🥰
      </p>

      <div className="text-pink-500 text-6xl animate-pulse">
        💑
      </div>
    </div>
  );
};