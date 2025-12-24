import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const categories = [
  { name: 'Фурри', icon: '🦊', color: 'from-pink-500 to-purple-500' },
  { name: 'Люди', icon: '👤', color: 'from-blue-500 to-cyan-500' },
  { name: 'Портреты', icon: '🎨', color: 'from-orange-500 to-red-500' },
  { name: 'Питомцы', icon: '🐾', color: 'from-green-500 to-emerald-500' },
  { name: 'Фоны', icon: '🌄', color: 'from-violet-500 to-indigo-500' },
];

const artists = [
  {
    id: 1,
    name: 'Мария Светлова',
    avatar: 'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/625fec74-53e9-45dd-9260-4556cccd5793.jpg',
    skill: 'expert',
    rating: 4.9,
    orders: 156,
    price: '3000-8000',
    categories: ['Фурри', 'Люди'],
    premium: true,
    portfolio: [
      'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/da220029-dae9-4570-a4af-f9a21d66ca48.jpg',
      'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/ea809716-4ecb-46c4-a2ef-51969cffa816.jpg',
    ],
    priceList: [
      { type: 'Портрет (голова)', price: '3000₽' },
      { type: 'Полный рост', price: '5000₽' },
      { type: 'Детальный фон', price: '8000₽' },
    ],
    reviews: [
      { id: 1, author: 'Алексей М.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', rating: 5, date: '15.12.2024', text: 'Потрясающая работа! Мария нарисовала моего фурри-персонажа лучше, чем я мог представить. Детализация на высоте, сроки соблюдены. Однозначно рекомендую!' },
      { id: 2, author: 'Катерина В.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kate', rating: 5, date: '10.12.2024', text: 'Профессионал своего дела! Очень отзывчивая, учла все пожелания. Результат превзошёл ожидания 🎨' },
      { id: 3, author: 'Денис К.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Denis', rating: 4, date: '05.12.2024', text: 'Хорошая работа, но пришлось немного подождать из-за очереди. В остальном всё отлично!' },
    ]
  },
  {
    id: 2,
    name: 'Артём Вайлд',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Artem',
    skill: 'advanced',
    rating: 4.7,
    orders: 89,
    price: '2000-5000',
    categories: ['Фурри', 'Питомцы'],
    premium: false,
    portfolio: [
      'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/ea809716-4ecb-46c4-a2ef-51969cffa816.jpg',
    ],
    priceList: [
      { type: 'Портрет питомца', price: '2000₽' },
      { type: 'Фурри персонаж', price: '4000₽' },
    ],
    reviews: [
      { id: 1, author: 'Ольга С.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga', rating: 5, date: '18.12.2024', text: 'Артём нарисовал портрет моего кота в стиле фэнтези — просто волшебно! Спасибо 🐾' },
      { id: 2, author: 'Игорь Л.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Igor', rating: 4, date: '12.12.2024', text: 'Качественно, быстро, адекватная цена. Небольшие правки сделал оперативно.' },
    ]
  },
  {
    id: 3,
    name: 'Катя Арт',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Katya',
    skill: 'intermediate',
    rating: 4.5,
    orders: 45,
    price: '1500-3000',
    categories: ['Портреты', 'Люди'],
    premium: false,
    portfolio: [
      'https://cdn.poehali.dev/projects/ecd1dd97-3a83-49b5-860e-cd5f2bd7e6a1/files/da220029-dae9-4570-a4af-f9a21d66ca48.jpg',
    ],
    priceList: [
      { type: 'Быстрый скетч', price: '1500₽' },
      { type: 'Детальный портрет', price: '3000₽' },
    ],
    reviews: [
      { id: 1, author: 'Мария П.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', rating: 5, date: '20.12.2024', text: 'Отличные скетчи! Катя очень быстро работает, цены приятные. Буду заказывать ещё!' },
      { id: 2, author: 'Антон Р.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anton', rating: 4, date: '14.12.2024', text: 'Хороший стиль, понравилось. Для своей цены — супер вариант.' },
    ]
  },
];

const skillLabels = {
  beginner: { label: 'Новичок', color: 'bg-green-500' },
  intermediate: { label: 'Опытный', color: 'bg-blue-500' },
  advanced: { label: 'Продвинутый', color: 'bg-purple-500' },
  expert: { label: 'Эксперт', color: 'bg-gradient-to-r from-pink-500 to-purple-600' },
};

export default function Index() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedArtist, setSelectedArtist] = useState<typeof artists[0] | null>(null);
  const [orderImages, setOrderImages] = useState<number>(0);

  const filteredArtists = artists.filter(artist => {
    const categoryMatch = selectedCategory === 'all' || artist.categories.includes(selectedCategory);
    const skillMatch = selectedSkill === 'all' || artist.skill === selectedSkill;
    return categoryMatch && skillMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ArtHub
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="text-sm font-medium hover:text-purple-600 transition-colors">Каталог</a>
            <a href="#how" className="text-sm font-medium hover:text-purple-600 transition-colors">Как работает</a>
            <a href="#premium" className="text-sm font-medium hover:text-purple-600 transition-colors">Premium</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">Войти</Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/dashboard')}>
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Кабинет художника
            </Button>
            <Button size="sm" className="gradient-primary text-white">Регистрация</Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 gradient-primary text-white border-0">🎨 Платформа для творчества</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Найди своего идеального художника
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Тысячи талантливых художников готовы воплотить твои идеи. От фурри-артов до портретов питомцев — здесь найдётся всё!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-white hover-scale text-lg px-8">
                <Icon name="Search" size={20} className="mr-2" />
                Найти художника
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-purple-300 hover-scale text-lg px-8">
                <Icon name="Palette" size={20} className="mr-2" />
                Стать художником
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`group p-6 rounded-2xl bg-gradient-to-br ${cat.color} hover-scale transition-all ${
                  selectedCategory === cat.name ? 'ring-4 ring-purple-400 scale-105' : ''
                }`}
              >
                <div className="text-5xl mb-3">{cat.icon}</div>
                <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input 
                placeholder="Поиск по имени художника..." 
                className="h-12 border-purple-200 focus:border-purple-400"
              />
            </div>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Уровень скилла" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="beginner">Новичок</SelectItem>
                <SelectItem value="intermediate">Опытный</SelectItem>
                <SelectItem value="advanced">Продвинутый</SelectItem>
                <SelectItem value="expert">Эксперт</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="price-asc">
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Цена: низкая</SelectItem>
                <SelectItem value="price-desc">Цена: высокая</SelectItem>
                <SelectItem value="rating">Рейтинг</SelectItem>
                <SelectItem value="orders">Популярность</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <Card key={artist.id} className="overflow-hidden hover-scale border-2 border-purple-100 hover:border-purple-300 transition-all">
                <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-400">
                  <img 
                    src={artist.portfolio[0]} 
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                  {artist.premium && (
                    <Badge className="absolute top-3 right-3 gradient-primary text-white border-0">
                      <Icon name="Crown" size={14} className="mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-14 h-14 ring-4 ring-purple-100">
                      <AvatarImage src={artist.avatar} alt={artist.name} />
                      <AvatarFallback>{artist.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{artist.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${skillLabels[artist.skill].color} text-white text-xs`}>
                          {skillLabels[artist.skill].label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{artist.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="ShoppingBag" size={16} />
                      <span>{artist.orders} заказов</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {artist.categories.map(cat => (
                      <Badge key={cat} variant="outline" className="text-xs border-purple-200">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-lg font-bold text-purple-600">{artist.price} ₽</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full gradient-primary text-white"
                        onClick={() => setSelectedArtist(artist)}
                      >
                        Посмотреть профиль
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Профиль художника</DialogTitle>
                      </DialogHeader>
                      {selectedArtist && (
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-20 h-20 ring-4 ring-purple-100">
                              <AvatarImage src={selectedArtist.avatar} alt={selectedArtist.name} />
                              <AvatarFallback>{selectedArtist.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold">{selectedArtist.name}</h2>
                                {selectedArtist.premium && (
                                  <Badge className="gradient-primary text-white border-0">
                                    <Icon name="Crown" size={14} className="mr-1" />
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge className={`${skillLabels[selectedArtist.skill].color} text-white`}>
                                  {skillLabels[selectedArtist.skill].label}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                                  <span className="font-semibold">{selectedArtist.rating}</span>
                                </div>
                                <span className="text-gray-600">{selectedArtist.orders} заказов</span>
                              </div>
                            </div>
                          </div>

                          <Tabs defaultValue="portfolio" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
                              <TabsTrigger value="prices">Прайс-лист</TabsTrigger>
                              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                              <TabsTrigger value="order">Заказать</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="portfolio" className="space-y-4">
                              <h3 className="font-bold text-lg">Примеры работ</h3>
                              <div className="grid grid-cols-2 gap-4">
                                {selectedArtist.portfolio.map((img, idx) => (
                                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden hover-scale">
                                    <img 
                                      src={img} 
                                      alt={`Работа ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="prices" className="space-y-4">
                              <h3 className="font-bold text-lg">Прайс-лист</h3>
                              <div className="space-y-3">
                                {selectedArtist.priceList.map((item, idx) => (
                                  <div 
                                    key={idx} 
                                    className="flex justify-between items-center p-4 rounded-xl gradient-card border border-purple-100"
                                  >
                                    <span className="font-medium">{item.type}</span>
                                    <span className="font-bold text-purple-600 text-lg">{item.price}</span>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="reviews" className="space-y-4">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg">Отзывы клиентов</h3>
                                <div className="flex items-center gap-2">
                                  <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                                  <span className="font-bold text-xl">{selectedArtist.rating}</span>
                                  <span className="text-gray-500 text-sm">({selectedArtist.reviews.length} отзывов)</span>
                                </div>
                              </div>
                              <div className="space-y-4">
                                {selectedArtist.reviews.map((review) => (
                                  <div 
                                    key={review.id} 
                                    className="p-4 rounded-xl gradient-card border border-purple-100 space-y-3"
                                  >
                                    <div className="flex items-start gap-3">
                                      <Avatar className="w-10 h-10">
                                        <AvatarImage src={review.avatar} alt={review.author} />
                                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <h4 className="font-semibold">{review.author}</h4>
                                          <span className="text-xs text-gray-500">{review.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                          {[...Array(5)].map((_, i) => (
                                            <Icon 
                                              key={i} 
                                              name="Star" 
                                              size={14} 
                                              className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                                  </div>
                                ))}
                              </div>
                              <Button variant="outline" className="w-full mt-4">
                                <Icon name="MessageSquare" size={18} className="mr-2" />
                                Оставить отзыв
                              </Button>
                            </TabsContent>
                            
                            <TabsContent value="order" className="space-y-4">
                              <h3 className="font-bold text-lg">Создать заказ</h3>
                              <div className="space-y-4">
                                <div>
                                  <Label>Тип работы</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Выберите тип" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {selectedArtist.priceList.map((item, idx) => (
                                        <SelectItem key={idx} value={item.type}>
                                          {item.type} — {item.price}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Описание заказа</Label>
                                  <Textarea 
                                    placeholder="Расскажите подробно, что вы хотите заказать..."
                                    rows={4}
                                  />
                                </div>
                                <div>
                                  <Label>Референсы (до 10 изображений, макс. 5MB каждое)</Label>
                                  <div className="mt-2 border-2 border-dashed border-purple-200 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                                    <Icon name="Upload" size={32} className="mx-auto text-purple-400 mb-2" />
                                    <p className="text-sm text-gray-600">
                                      Нажмите или перетащите изображения
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                      Загружено: {orderImages}/10
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <Button className="flex-1 gradient-primary text-white">
                                    <Icon name="Send" size={18} className="mr-2" />
                                    Отправить заказ
                                  </Button>
                                  <Button variant="outline" className="flex-1">
                                    <Icon name="MessageCircle" size={18} className="mr-2" />
                                    Написать сообщение
                                  </Button>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="premium" className="py-20 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Icon name="Crown" size={14} className="mr-1" />
              Premium для художников
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Выделись среди тысяч художников
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Премиум подписка открывает доступ к эксклюзивным возможностям продвижения
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Icon name="Sparkles" size={32} className="mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Свой дизайн страницы</h3>
                <p className="text-white/80 text-sm">Уникальное оформление профиля</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Icon name="TrendingUp" size={32} className="mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Топ рекомендаций</h3>
                <p className="text-white/80 text-sm">Чаще показываем заказчикам</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Icon name="Zap" size={32} className="mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Приоритет в поиске</h3>
                <p className="text-white/80 text-sm">Выше в результатах поиска</p>
              </div>
            </div>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 hover-scale">
              Получить Premium — 999₽/месяц
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <span className="text-xl font-bold">ArtHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Платформа для художников и заказчиков
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Художникам</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Регистрация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Premium</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Заказчикам</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Как заказать</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Защита покупателя</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>support@arthub.ru</li>
                <li>Telegram: @arthub_support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 ArtHub. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}