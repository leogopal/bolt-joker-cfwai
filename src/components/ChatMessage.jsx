export default function ChatMessage({ message, isBot }) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[80%] rounded-lg p-3 ${
        isBot 
          ? 'bg-gray-200 text-gray-800' 
          : 'bg-blue-500 text-white'
      }`}>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}
