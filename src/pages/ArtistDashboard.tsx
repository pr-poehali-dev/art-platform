import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const orders = [
  {
    id: 1,
    clientName: 'Алексей М.',
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    type: 'Портрет (голова)',
    status: 'in_progress',
    price: '3000₽',
    deadline: '28.12.2024',
    description: 'Нужен портрет моего фурри-персонажа, лиса с синим мехом',
    progress: 60,
    references: 3,
    messages: 5,
  },
  {
    id: 2,
    clientName: 'Катерина В.',
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kate',
    type: 'Полный рост',
    status: 'pending',
    price: '5000₽',
    deadline: '02.01.2025',
    description: 'Персонаж в полный рост с детальным фоном леса',
    progress: 0,
    references: 7,
    messages: 2,
  },
  {
    id: 3,
    clientName: 'Денис К.',
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Denis',
    type: 'Детальный фон',
    status: 'review',
    price: '8000₽',
    deadline: '25.12.2024',
    description: 'Фэнтезийный фон с замком на скале',
    progress: 100,
    references: 4,
    messages: 8,
  },
  {
    id: 4,
    clientName: 'Ольга С.',
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga',
    type: 'Портрет (голова)',
    status: 'completed',
    price: '3000₽',
    deadline: '15.12.2024',
    description: 'Портрет питомца - кот в стиле фэнтези',
    progress: 100,
    references: 2,
    messages: 12,
  },
];

const statusLabels = {
  pending: { label: 'Новый', color: 'bg-blue-500', icon: 'Clock' },
  in_progress: { label: 'В работе', color: 'bg-purple-500', icon: 'Palette' },
  review: { label: 'На проверке', color: 'bg-orange-500', icon: 'Eye' },
  completed: { label: 'Завершён', color: 'bg-green-500', icon: 'CheckCircle2' },
};

const stats = {
  totalOrders: 156,
  activeOrders: 3,
  revenue: '468,000₽',
  rating: 4.9,
  reviewsCount: 89,
  completionRate: 98,
};

export default function ArtistDashboard() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              На главную
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Личный кабинет
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Icon name="Bell" size={18} />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/625fec74-53e9-45dd-9260-4556cccd5793.jpg" />
              <AvatarFallback>МС</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="w-24 h-24 ring-4 ring-purple-200">
            <AvatarImage src="https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/625fec74-53e9-45dd-9260-4556cccd5793.jpg" />
            <AvatarFallback>МС</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">Мария Светлова</h1>
              <Badge className="gradient-primary text-white border-0">
                <Icon name="Crown" size={14} className="mr-1" />
                Premium
              </Badge>
            </div>
            <p className="text-gray-600">Эксперт • Специализация: Фурри, Люди</p>
          </div>
          <Button className="gradient-primary text-white">
            <Icon name="Settings" size={18} className="mr-2" />
            Настройки профиля
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="gradient-card border-purple-100">
            <CardHeader className="pb-3">
              <CardDescription>Всего заказов</CardDescription>
              <CardTitle className="text-3xl">{stats.totalOrders}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Icon name="TrendingUp" size={16} />
                <span>+12% за месяц</span>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-purple-100">
            <CardHeader className="pb-3">
              <CardDescription>Активные заказы</CardDescription>
              <CardTitle className="text-3xl">{stats.activeOrders}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-purple-600">
                <Icon name="Palette" size={16} />
                <span>В работе</span>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-purple-100">
            <CardHeader className="pb-3">
              <CardDescription>Общий доход</CardDescription>
              <CardTitle className="text-3xl">{stats.revenue}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Icon name="DollarSign" size={16} />
                <span>За всё время</span>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-purple-100">
            <CardHeader className="pb-3">
              <CardDescription>Рейтинг</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                {stats.rating}
                <Icon name="Star" size={24} className="text-yellow-500 fill-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{stats.reviewsCount} отзывов</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-purple-100">
          <CardHeader>
            <CardTitle className="text-2xl">Управление заказами</CardTitle>
            <CardDescription>Отслеживайте статус и прогресс ваших работ</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="all">
                  Все ({orders.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Новые ({orders.filter(o => o.status === 'pending').length})
                </TabsTrigger>
                <TabsTrigger value="in_progress">
                  В работе ({orders.filter(o => o.status === 'in_progress').length})
                </TabsTrigger>
                <TabsTrigger value="review">
                  На проверке ({orders.filter(o => o.status === 'review').length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Завершены ({orders.filter(o => o.status === 'completed').length})
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-all hover-scale bg-white"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 ring-2 ring-purple-100">
                        <AvatarImage src={order.clientAvatar} alt={order.clientName} />
                        <AvatarFallback>{order.clientName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{order.clientName}</h3>
                              <Badge className={`${statusLabels[order.status].color} text-white text-xs`}>
                                <Icon name={statusLabels[order.status].icon as any} size={12} className="mr-1" />
                                {statusLabels[order.status].label}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{order.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-600 text-lg">{order.price}</p>
                            <p className="text-xs text-gray-500">Дедлайн: {order.deadline}</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700">{order.description}</p>

                        {order.status !== 'completed' && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Прогресс выполнения</span>
                              <span className="font-semibold text-purple-600">{order.progress}%</span>
                            </div>
                            <Progress value={order.progress} className="h-2" />
                          </div>
                        )}

                        <div className="flex items-center gap-3 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="gradient-primary text-white"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Icon name="Eye" size={16} className="mr-2" />
                                Детали заказа
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">Детали заказа #{order.id}</DialogTitle>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="space-y-6">
                                  <div className="flex items-start gap-4">
                                    <Avatar className="w-16 h-16">
                                      <AvatarImage src={selectedOrder.clientAvatar} />
                                      <AvatarFallback>{selectedOrder.clientName[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <h3 className="font-bold text-xl">{selectedOrder.clientName}</h3>
                                      <p className="text-gray-600">{selectedOrder.type}</p>
                                      <Badge className={`${statusLabels[selectedOrder.status].color} text-white mt-2`}>
                                        {statusLabels[selectedOrder.status].label}
                                      </Badge>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-purple-600 text-2xl">{selectedOrder.price}</p>
                                      <p className="text-sm text-gray-500">Дедлайн: {selectedOrder.deadline}</p>
                                    </div>
                                  </div>

                                  <div className="p-4 rounded-xl gradient-card border border-purple-100">
                                    <h4 className="font-semibold mb-2">Описание заказа</h4>
                                    <p className="text-gray-700">{selectedOrder.description}</p>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-3">Референсы ({selectedOrder.references})</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                      {[...Array(Math.min(selectedOrder.references, 6))].map((_, i) => (
                                        <div key={i} className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
                                          <Icon name="Image" size={32} className="text-gray-400" />
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-3">Обновить статус</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                      <Button variant="outline" className="w-full">
                                        <Icon name="Clock" size={16} className="mr-2" />
                                        Начать работу
                                      </Button>
                                      <Button variant="outline" className="w-full">
                                        <Icon name="Eye" size={16} className="mr-2" />
                                        Отправить на проверку
                                      </Button>
                                      <Button variant="outline" className="w-full">
                                        <Icon name="Upload" size={16} className="mr-2" />
                                        Загрузить файлы
                                      </Button>
                                      <Button className="w-full gradient-primary text-white">
                                        <Icon name="CheckCircle2" size={16} className="mr-2" />
                                        Завершить заказ
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                                    <div className="flex items-start gap-3">
                                      <Icon name="MessageCircle" size={20} className="text-blue-600 mt-1" />
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-blue-900 mb-1">Сообщения</h4>
                                        <p className="text-sm text-blue-700 mb-3">
                                          У вас {selectedOrder.messages} сообщений в этом заказе
                                        </p>
                                        <Button size="sm" variant="outline" className="border-blue-300">
                                          Открыть чат
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline">
                            <Icon name="MessageCircle" size={16} className="mr-2" />
                            Чат ({order.messages})
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="Paperclip" size={16} className="mr-2" />
                            Референсы ({order.references})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredOrders.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Icon name="PackageOpen" size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Нет заказов в этой категории</p>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
