import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const categories = ['Фурри', 'Люди', 'Портреты', 'Питомцы', 'Фоны', 'Аниме', 'Комиксы', 'Концепт-арт'];

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'artist' | 'client'>('client');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              На главную
            </Button>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                A
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ArtHub
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Присоединяйся к комьюнити</h1>
            <p className="text-gray-600">Создай аккаунт и начни творить или заказывать арт</p>
          </div>

          <Card className="border-2 border-purple-100 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= 1 ? 'gradient-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      1
                    </div>
                    <div className={`h-1 flex-1 rounded ${step >= 2 ? 'gradient-primary' : 'bg-gray-200'}`}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= 2 ? 'gradient-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      2
                    </div>
                    <div className={`h-1 flex-1 rounded ${step >= 3 ? 'gradient-primary' : 'bg-gray-200'}`}></div>
                  </div>
                </div>
                <div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= 3 ? 'gradient-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    3
                  </div>
                </div>
              </div>
              <CardTitle>
                {step === 1 && 'Выбери тип аккаунта'}
                {step === 2 && 'Основная информация'}
                {step === 3 && userType === 'artist' ? 'Профиль художника' : 'Завершение регистрации'}
              </CardTitle>
              <CardDescription>
                {step === 1 && 'Ты художник или хочешь заказать арт?'}
                {step === 2 && 'Расскажи о себе'}
                {step === 3 && userType === 'artist' ? 'Настрой свой профиль' : 'Последний шаг'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <RadioGroup value={userType} onValueChange={(val) => setUserType(val as 'artist' | 'client')}>
                    <div
                      onClick={() => setUserType('artist')}
                      className={`flex items-start gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all hover-scale ${
                        userType === 'artist' ? 'border-purple-500 gradient-card' : 'border-gray-200'
                      }`}
                    >
                      <RadioGroupItem value="artist" id="artist" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="Palette" size={24} className="text-purple-600" />
                          <Label htmlFor="artist" className="text-lg font-bold cursor-pointer">
                            Я художник
                          </Label>
                        </div>
                        <p className="text-sm text-gray-600">
                          Создавай портфолио, получай заказы и зарабатывай на своём творчестве
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="outline" className="text-xs">Портфолио</Badge>
                          <Badge variant="outline" className="text-xs">Заказы</Badge>
                          <Badge variant="outline" className="text-xs">Заработок</Badge>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setUserType('client')}
                      className={`flex items-start gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all hover-scale ${
                        userType === 'client' ? 'border-purple-500 gradient-card' : 'border-gray-200'
                      }`}
                    >
                      <RadioGroupItem value="client" id="client" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="ShoppingBag" size={24} className="text-blue-600" />
                          <Label htmlFor="client" className="text-lg font-bold cursor-pointer">
                            Я заказчик
                          </Label>
                        </div>
                        <p className="text-sm text-gray-600">
                          Находи талантливых художников и воплощай свои идеи в жизнь
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="outline" className="text-xs">Поиск</Badge>
                          <Badge variant="outline" className="text-xs">Защита</Badge>
                          <Badge variant="outline" className="text-xs">Отзывы</Badge>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <Button
                    className="w-full gradient-primary text-white text-lg py-6"
                    onClick={() => setStep(2)}
                  >
                    Продолжить
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Имя</Label>
                      <Input placeholder="Мария" className="mt-2" />
                    </div>
                    <div>
                      <Label>Фамилия</Label>
                      <Input placeholder="Светлова" className="mt-2" />
                    </div>
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="maria@example.com" className="mt-2" />
                  </div>

                  <div>
                    <Label>Пароль</Label>
                    <Input type="password" placeholder="Минимум 8 символов" className="mt-2" />
                  </div>

                  <div>
                    <Label>Подтверди пароль</Label>
                    <Input type="password" placeholder="Повтори пароль" className="mt-2" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Я согласен с{' '}
                      <a href="#" className="text-purple-600 hover:underline">
                        условиями использования
                      </a>{' '}
                      и{' '}
                      <a href="#" className="text-purple-600 hover:underline">
                        политикой конфиденциальности
                      </a>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      <Icon name="ArrowLeft" size={18} className="mr-2" />
                      Назад
                    </Button>
                    <Button
                      className="flex-1 gradient-primary text-white"
                      onClick={() => setStep(3)}
                    >
                      Продолжить
                      <Icon name="ArrowRight" size={18} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && userType === 'artist' && (
                <div className="space-y-4">
                  <div>
                    <Label>Никнейм художника</Label>
                    <Input placeholder="@maria_art" className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Это будет отображаться в твоём профиле</p>
                  </div>

                  <div>
                    <Label>Уровень мастерства</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Выбери уровень" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Новичок</SelectItem>
                        <SelectItem value="intermediate">Опытный</SelectItem>
                        <SelectItem value="advanced">Продвинутый</SelectItem>
                        <SelectItem value="expert">Эксперт</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Специализация</Label>
                    <p className="text-sm text-gray-600 mb-3 mt-1">Выбери категории, в которых ты работаешь</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <Badge
                          key={cat}
                          variant={selectedCategories.includes(cat) ? 'default' : 'outline'}
                          className={`cursor-pointer transition-all hover-scale ${
                            selectedCategories.includes(cat) ? 'gradient-primary text-white' : ''
                          }`}
                          onClick={() => toggleCategory(cat)}
                        >
                          {selectedCategories.includes(cat) && (
                            <Icon name="Check" size={14} className="mr-1" />
                          )}
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Описание профиля</Label>
                    <Textarea
                      placeholder="Расскажи о себе, своём стиле и опыте..."
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Минимальная цена</Label>
                      <Input type="number" placeholder="1000" className="mt-2" />
                    </div>
                    <div>
                      <Label>Максимальная цена</Label>
                      <Input type="number" placeholder="10000" className="mt-2" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                    <div className="flex items-start gap-3">
                      <Icon name="Sparkles" size={24} className="text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-1">Premium подписка</h4>
                        <p className="text-sm text-purple-700 mb-3">
                          Получи больше заказов с Premium! Свой дизайн страницы, топ рекомендаций и приоритет в поиске.
                        </p>
                        <Button size="sm" variant="outline" className="border-purple-300">
                          Узнать больше
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(2)}
                    >
                      <Icon name="ArrowLeft" size={18} className="mr-2" />
                      Назад
                    </Button>
                    <Button
                      className="flex-1 gradient-primary text-white"
                      onClick={() => navigate('/dashboard')}
                    >
                      <Icon name="CheckCircle2" size={18} className="mr-2" />
                      Создать профиль
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && userType === 'client' && (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle2" size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Всё готово!</h3>
                    <p className="text-gray-600 mb-6">
                      Твой аккаунт успешно создан. Начни искать художников и воплощать идеи в жизнь!
                    </p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                      <div className="p-4 rounded-xl gradient-card border border-purple-100">
                        <Icon name="Search" size={32} className="text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Найди художника</p>
                      </div>
                      <div className="p-4 rounded-xl gradient-card border border-purple-100">
                        <Icon name="MessageCircle" size={32} className="text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Обсуди детали</p>
                      </div>
                      <div className="p-4 rounded-xl gradient-card border border-purple-100">
                        <Icon name="CreditCard" size={32} className="text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Оплати безопасно</p>
                      </div>
                      <div className="p-4 rounded-xl gradient-card border border-purple-100">
                        <Icon name="Star" size={32} className="text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm font-medium">Оставь отзыв</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full gradient-primary text-white text-lg py-6"
                    onClick={() => navigate('/')}
                  >
                    Перейти к каталогу
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Уже есть аккаунт?{' '}
              <a href="#" className="text-purple-600 hover:underline font-medium">
                Войти
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
