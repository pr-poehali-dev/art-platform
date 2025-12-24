import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const conversations = [
  {
    id: 1,
    user: {
      name: 'Алексей М.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      isOnline: true,
    },
    lastMessage: 'Спасибо, жду финального варианта!',
    timestamp: '10:24',
    unread: 2,
    orderId: 1,
    orderType: 'Портрет (голова)',
  },
  {
    id: 2,
    user: {
      name: 'Катерина В.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kate',
      isOnline: false,
    },
    lastMessage: 'Можно добавить больше деталей на фон?',
    timestamp: 'Вчера',
    unread: 0,
    orderId: 2,
    orderType: 'Полный рост',
  },
  {
    id: 3,
    user: {
      name: 'Денис К.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Denis',
      isOnline: true,
    },
    lastMessage: 'Отлично! Принимаю работу 👍',
    timestamp: '15.12',
    unread: 0,
    orderId: 3,
    orderType: 'Детальный фон',
  },
  {
    id: 4,
    user: {
      name: 'Ольга С.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga',
      isOnline: false,
    },
    lastMessage: 'Спасибо большое за работу! 🎨',
    timestamp: '12.12',
    unread: 0,
    orderId: 4,
    orderType: 'Портрет питомца',
  },
];

const messages = [
  {
    id: 1,
    sender: 'client',
    text: 'Привет! Хочу заказать портрет моего фурри-персонажа',
    timestamp: '09:15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  {
    id: 2,
    sender: 'artist',
    text: 'Привет! Конечно, расскажи подробнее о персонаже',
    timestamp: '09:17',
    avatar: 'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/625fec74-53e9-45dd-9260-4556cccd5793.jpg',
  },
  {
    id: 3,
    sender: 'client',
    text: 'Это лиса с синим мехом, зелёные глаза, дружелюбное выражение',
    timestamp: '09:18',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  {
    id: 4,
    sender: 'client',
    text: 'Прикрепляю референсы',
    timestamp: '09:18',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    attachments: [
      { type: 'image', url: 'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/da220029-dae9-4570-a4af-f9a21d66ca48.jpg' },
      { type: 'image', url: 'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/ea809716-4ecb-46c4-a2ef-51969cffa816.jpg' },
    ],
  },
  {
    id: 5,
    sender: 'artist',
    text: 'Отличные референсы! Я могу сделать такой портрет за 3000₽ в течение 5 дней. Подойдёт?',
    timestamp: '09:25',
    avatar: 'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/625fec74-53e9-45dd-9260-4556cccd5793.jpg',
  },
  {
    id: 6,
    sender: 'client',
    text: 'Да, отлично! Давай начинаем',
    timestamp: '09:30',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  {
    id: 7,
    sender: 'artist',
    text: 'Супер! Я начну работу сегодня. Покажу первый набросок завтра',
    timestamp: '09:32',
    avatar: 'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/625fec74-53e9-45dd-9260-4556cccd5793.jpg',
  },
  {
    id: 8,
    sender: 'artist',
    text: 'Вот первый вариант! Что думаешь?',
    timestamp: '10:15',
    avatar: 'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/625fec74-53e9-45dd-9260-4556cccd5793.jpg',
    attachments: [
      { type: 'image', url: 'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/da220029-dae9-4570-a4af-f9a21d66ca48.jpg' },
    ],
  },
  {
    id: 9,
    sender: 'client',
    text: 'Круто! Можно сделать глаза чуть больше?',
    timestamp: '10:20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  {
    id: 10,
    sender: 'artist',
    text: 'Конечно, исправлю сегодня вечером',
    timestamp: '10:22',
    avatar: 'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/625fec74-53e9-45dd-9260-4556cccd5793.jpg',
  },
  {
    id: 11,
    sender: 'client',
    text: 'Спасибо, жду финального варианта!',
    timestamp: '10:24',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
];

export default function Chat() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur-lg border-b border-purple-100 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="MessageCircle" size={24} className="text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Сообщения
              </span>
            </div>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/625fec74-53e9-45dd-9260-4556cccd5793.jpg" />
            <AvatarFallback>МС</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex-1 container mx-auto flex gap-4 py-4 px-4 overflow-hidden">
        <Card className="w-80 border-2 border-purple-100 flex flex-col">
          <div className="p-4 border-b">
            <Input
              placeholder="Поиск по сообщениям..."
              className="w-full"
            />
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv)}
                  className={`p-3 rounded-lg cursor-pointer transition-all mb-2 ${
                    selectedChat.id === conv.id
                      ? 'gradient-card border-2 border-purple-300'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                        <AvatarFallback>{conv.user.name[0]}</AvatarFallback>
                      </Avatar>
                      {conv.user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm truncate">{conv.user.name}</h4>
                        <span className="text-xs text-gray-500">{conv.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1 truncate">{conv.orderType}</p>
                      <p className="text-sm text-gray-700 truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="gradient-primary text-white text-xs px-2">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="flex-1 border-2 border-purple-100 flex flex-col">
          <div className="p-4 border-b bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                    <AvatarFallback>{selectedChat.user.name[0]}</AvatarFallback>
                  </Avatar>
                  {selectedChat.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{selectedChat.user.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedChat.user.isOnline ? 'В сети' : 'Был(а) недавно'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Phone" size={18} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Video" size={18} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="MoreVertical" size={18} />
                </Button>
              </div>
            </div>
            <div className="mt-3">
              <Badge variant="outline" className="text-xs">
                <Icon name="ShoppingBag" size={12} className="mr-1" />
                Заказ #{selectedChat.orderId} • {selectedChat.orderType}
              </Badge>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'artist' ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.sender === 'artist' ? 'МС' : 'АМ'}</AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col ${message.sender === 'artist' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-md p-3 rounded-2xl ${
                        message.sender === 'artist'
                          ? 'gradient-primary text-white'
                          : 'bg-white border border-purple-100'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      {message.attachments && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {message.attachments.map((att, idx) => (
                            <div key={idx} className="relative rounded-lg overflow-hidden">
                              <img
                                src={att.url}
                                alt="Attachment"
                                className="w-full h-32 object-cover hover-scale cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Separator />

          <div className="p-4 bg-white">
            <div className="flex items-end gap-3">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Icon name="Paperclip" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Image" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Smile" size={18} />
                </Button>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Напишите сообщение..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full"
                />
              </div>
              <Button
                className="gradient-primary text-white"
                onClick={handleSendMessage}
              >
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
