import { useAuth } from "../ContextAPI/AuthContext";
import { MarkRead } from "./Controller/NotificationController";

const NotificationList = () => {
  const { notifyList,setRefresh } = useAuth();

  const handleRead = (id) => {
    if (!id) return;

    MarkRead(id)
      .then((response) => {
        alert("Notification marked as read");
        console.log(response.data);
        setRefresh(true);
      })
      .catch((error) => {
        alert("Failed to update notification");
        console.log(error);
      });
  };

  return (
    <div className="w-full mt-12 flex flex-col items-center mt-6 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Notifications
      </h2>

      {notifyList && notifyList.length > 0 ? (
        <div className="w-full max-w-3xl space-y-4">
          {notifyList.map((t) => (
            <div
            
              key={t.id}
              className="bg-white/40 header_bar_Top task-card backdrop-blur-md shadow-lg rounded-xl p-5 border border-gray-200 transition-all hover:shadow-xl hover:bg-white/60"
            >
              <div className="flex justify-between items-center">
                <h3 className="Mail font-semibold text-lg text-gray-800">
                  {t.title}
                </h3>

                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    t.read
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {t.read ? "Read" : "Unread"}
                </span>
              </div>

              <p className="Mail text-gray-600 mt-1">
                <span className="font-medium">Type:</span> {t.type}
              </p>

              <p className="Mail text-gray-600">
                <span className="font-medium"></span> {t.message}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                {new Date(t.createdAt).toLocaleString()}
              </p>

              {!t.read && (
                <button
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition-all"
                  onClick={() => handleRead(t.id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg mt-4">No notifications found</p>
      )}
    </div>
  );
};

export default NotificationList;
