// components/ChatroomList.jsx

export default function ChatroomList({ rooms = [], onSelect }) {
  return (
    <ul className="space-y-2">
      {rooms.map((room) => (
        <li
          key={room.id}
          onClick={() => onSelect(room)}
          className="cursor-pointer p-3 bg-white rounded shadow hover:bg-blue-50"
        >
          <h3 className="font-semibold">{room.name}</h3>
          <p className="text-sm text-gray-500">{room.description}</p>
        </li>
      ))}
    </ul>
  );
}
