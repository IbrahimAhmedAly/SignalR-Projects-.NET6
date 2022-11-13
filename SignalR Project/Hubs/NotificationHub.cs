using Microsoft.AspNetCore.SignalR;

namespace SignalR_Project.Hubs
{
    public class NotificationHub : Hub
    {
        public static int notificationCounter { get; set; }
        public static List<string> messages { get; set; } = new();


        public async Task SendMessage(string message) {
            {
                if(!string.IsNullOrEmpty(message))
                {
                    notificationCounter++;
                    messages.Add(message);
                    await LoadMessages();
                }
            } 
        }

        public async Task LoadMessages()
        {
            await Clients.All.SendAsync("LoadNotification", messages, notificationCounter);
        }
    }
}
