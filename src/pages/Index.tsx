import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('BTC');
  const [amount, setAmount] = useState('100000');
  const [result, setResult] = useState('1.85');

  const calculateExchange = () => {
    if (!amount || isNaN(Number(amount))) return;
    
    const rates = {
      'RUB-BTC': 0.0000185,
      'BTC-RUB': 54000,
      'RUB-ETH': 0.00035,
      'ETH-RUB': 2857,
      'RUB-USDT': 0.0106,
      'USDT-RUB': 94.5
    };
    
    const rate = rates[`${fromCurrency}-${toCurrency}` as keyof typeof rates] || 1;
    const commission = 0.85 / 100;
    const grossAmount = Number(amount) * rate;
    const finalAmount = grossAmount * (1 - commission);
    
    setResult(finalAmount.toFixed(8));
  };

  useEffect(() => {
    calculateExchange();
  }, [amount, fromCurrency, toCurrency]);

  const advantages = [
    {
      icon: 'DollarSign',
      title: 'Минимальная комиссия',
      description: 'Всего 0,85% на обмен криптовалюты'
    },
    {
      icon: 'Banknote',
      title: 'Наличные без комиссии',
      description: 'Пополнение и снятие в офисе бесплатно'
    },
    {
      icon: 'Zap',
      title: 'Мгновенные операции',
      description: 'Обмен в режиме реального времени'
    },
    {
      icon: 'Shield',
      title: 'Надежно и безопасно',
      description: 'Защита ваших средств и данных'
    }
  ];

  const commissionData = [
    {
      network: 'BTC (Bitcoin)',
      deposit: { fee: '0.0001 BTC', min: '0.001 BTC', max: 'Без ограничений' },
      withdraw: { fee: '0.0002 BTC', min: '0.001 BTC', max: 'Без ограничений' }
    },
    {
      network: 'ETH (Ethereum)',
      deposit: { fee: '0.001 ETH', min: '0.01 ETH', max: 'Без ограничений' },  
      withdraw: { fee: '0.002 ETH', min: '0.01 ETH', max: 'Без ограничений' }
    },
    {
      network: 'USDT (TRC20)',
      deposit: { fee: '1 USDT', min: '10 USDT', max: 'Без ограничений' },
      withdraw: { fee: '2 USDT', min: '10 USDT', max: 'Без ограничений' }
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-heading font-bold mb-6 text-white">
              EASY.PAY
            </h1>
            <p className="text-2xl mb-4 font-medium text-foreground">
              Обмен криптовалюты с комиссией всего <span className="neon-green font-bold">0,85%</span>
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Пополняйте и снимайте наличные без комиссий в нашем офисе в Ульяновске. 
              Обслуживаем клиентов по всему Поволжью.
            </p>
          </div>

          {/* Calculator Card */}
          <Card className="rapira-card max-w-2xl mx-auto animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading text-foreground flex items-center justify-center gap-2">
                <Icon name="Calculator" size={28} className="neon-green" />
                Калькулятор обмена
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Отдаете</label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RUB">RUB (Рубль)</SelectItem>
                      <SelectItem value="BTC">BTC (Bitcoin)</SelectItem>
                      <SelectItem value="ETH">ETH (Ethereum)</SelectItem>
                      <SelectItem value="USDT">USDT (Tether)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Введите сумму"
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Получаете</label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTC">BTC (Bitcoin)</SelectItem>
                      <SelectItem value="ETH">ETH (Ethereum)</SelectItem>
                      <SelectItem value="USDT">USDT (Tether)</SelectItem>
                      <SelectItem value="RUB">RUB (Рубль)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={result}
                    readOnly
                    className="text-lg font-bold neon-green bg-accent/10 border-accent/30"
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Комиссия: <span className="neon-green">0,85%</span> • Курс обновляется в реальном времени
                </p>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold glow-effect">
                  <Icon name="ArrowRightLeft" className="mr-2" size={20} />
                  Оформить заявку
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-16 text-foreground">
            Почему выбирают Easy.Pay
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="rapira-card text-center hover:glow-effect transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-float glow-effect">
                    <Icon name={advantage.icon as any} size={32} className="text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Table Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-16 text-foreground">
            Комиссии и лимиты
          </h2>

          <Card className="rapira-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Icon name="Table" size={24} className="neon-green" />
                Тарифы по операциям
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="crypto" className="border border-border rounded-lg rapira-card">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Icon name="Bitcoin" size={20} className="neon-green" />
                      <span className="font-semibold text-foreground">Криптовалюты</span>
                      <Badge className="bg-accent text-accent-foreground">0,85%</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium">Сеть</th>
                            <th className="text-left py-2 font-medium">Пополнение</th>
                            <th className="text-left py-2 font-medium">Вывод</th>
                          </tr>
                        </thead>
                        <tbody>
                          {commissionData.map((row, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-3 font-medium">{row.network}</td>
                              <td className="py-3">
                                <div className="text-xs space-y-1">
                                  <div>Комиссия: <span className="font-medium">{row.deposit.fee}</span></div>
                                  <div>Мин: {row.deposit.min}</div>
                                  <div>Макс: {row.deposit.max}</div>
                                </div>
                              </td>
                              <td className="py-3">
                                <div className="text-xs space-y-1">
                                  <div>Комиссия: <span className="font-medium">{row.withdraw.fee}</span></div>
                                  <div>Мин: {row.withdraw.min}</div>
                                  <div>Макс: {row.withdraw.max}</div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cash" className="border border-border rounded-lg rapira-card">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Icon name="Banknote" size={20} className="neon-green" />
                      <span className="font-semibold text-foreground">Наличные операции</span>
                      <Badge className="bg-accent text-accent-foreground">0%</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                        <span className="text-foreground">Пополнение наличными в офисе</span>
                        <Badge className="bg-accent text-accent-foreground">Бесплатно</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                        <span className="text-foreground">Снятие наличных в офисе</span>
                        <Badge className="bg-accent text-accent-foreground">Бесплатно</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-16 text-foreground">
            Контакты и адрес
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="rapira-card hover:glow-effect transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Icon name="MapPin" size={24} className="neon-green" />
                  Наш офис
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={20} className="neon-green mt-1" />
                  <div>
                    <p className="font-medium text-foreground">г. Ульяновск, ул. Центральная, 123</p>
                    <p className="text-sm text-muted-foreground">Ульяновская область, Поволжье</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={20} className="neon-green" />
                  <div>
                    <p className="font-medium text-foreground">Ежедневно с 10:00 до 20:00</p>
                    <p className="text-sm text-muted-foreground">Без выходных</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Icon name="Send" size={20} className="neon-green" />
                  <div>
                    <p className="font-medium text-foreground">@EasyPay58</p>
                    <p className="text-sm text-muted-foreground">Telegram для связи</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rapira-card hover:glow-effect transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Icon name="Users" size={24} className="neon-green" />
                  Обслуживаем регионы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Ульяновская область',
                    'Самарская область', 
                    'Пензенская область',
                    'Республика Татарстан',
                    'Нижегородская область'
                  ].map((region, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Icon name="CheckCircle" size={16} className="neon-green" />
                      <span className="text-foreground">{region}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm text-foreground font-medium">
                    <Icon name="Info" size={16} className="inline mr-2 neon-green" />
                    Работаем для клиентов по всему Среднему Поволжью
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hero-gradient py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-3xl font-heading font-bold mb-4 text-white">EASY.PAY</h3>
          <p className="neon-green mb-6">
            Надежный обмен криптовалют в Поволжье с минимальными комиссиями
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
            <span>© 2024 Easy.Pay</span>
            <span>•</span>
            <span>г. Ульяновск</span>
            <span>•</span>
            <span>@EasyPay58</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;