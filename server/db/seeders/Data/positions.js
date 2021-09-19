const positions = [
  {
    subcategory_id: 1,
    measure_id: 1,
    name: 'СЛАДКИЕ ПОМИДОРЫ ',
    description: 'С красным луком, с оливковым маслом, базиликом и сыром сулугуни',
    kcal: 100,
    portion_size: 280,
    price: 390,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 1,
    measure_id: 1,
    name: 'БУРРАТА',
    description: 'с томатами, руколой и бальзамическим кремом',
    kcal: 100,
    portion_size: 250,
    price: 570,
    file_id: 2,
    createdAt: new Date(),
  },
  {
    subcategory_id: 2,
    measure_id: 2,
    name: 'ГРИБНОЙ КРЕМ-СУП',
    description: 'шампиньоны, белые грибы, лук и сливки',
    kcal: 100,
    portion_size: 350,
    price: 370,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 2,
    measure_id: 2,
    name: 'СИБИРСКИЙ БОРЩ',
    description: 'говядина, фасоль, белые грибы, подается с хлебцами с салом и сметаной',
    kcal: 100,
    portion_size: 300,
    price: 320,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 3,
    measure_id: 1,
    name: 'ТОМЛЕНАЯ РВАНАЯ ГОВЯДИНА',
    description: 'нежная говядина су-вид подается с пюре из пастернака и брусничным соусом',
    kcal: 100,
    portion_size: 200,
    price: 610,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 3,
    measure_id: 1,
    name: 'УТИНАЯ НОЖКА СУ-ВИД',
    description: 'с шукрутом и морковным пюре',
    kcal: 100,
    portion_size: 220,
    price: 490,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 4,
    measure_id: 2,
    name: 'ДОППИО',
    description: '',
    kcal: 100,
    portion_size: 60,
    price: 100,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 4,
    measure_id: 2,
    name: 'КАПУЧИНО',
    description: '',
    kcal: 100,
    portion_size: 300,
    price: 180,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 5,
    measure_id: 2,
    name: 'ЧЕРНЫЙ',
    description: 'традиционный / бергамот / чабрец',
    kcal: 100,
    portion_size: 600,
    price: 180,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 5,
    measure_id: 2,
    name: 'РОЙБУШ',
    description: 'клубника со сливками',
    kcal: 100,
    portion_size: 600,
    price: 180,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 6,
    measure_id: 2,
    name: 'АПЕЛЬСИНОВЫЙ',
    description: '',
    kcal: 100,
    portion_size: 250,
    price: 60,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 6,
    measure_id: 2,
    name: 'ТОМАТНЫЙ',
    description: '',
    kcal: 100,
    portion_size: 250,
    price: 60,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 7,
    measure_id: 3,
    name: 'БУДВАЙЗЕР',
    description: 'Бутылочное СВЕТЛОЕ',
    kcal: 100,
    portion_size: 0.33,
    price: 250,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 7,
    measure_id: 3,
    name: 'КРОМБАХЕР ПИЛС',
    description: 'Бутылочное',
    kcal: 100,
    portion_size: 0.5,
    price: 350,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 8,
    measure_id: 2,
    name: 'МАКАЛЛАН ДАБЛ КАСК 18 Y.O.',
    description: 'ДЕГУСТАЦИОННЫЙ СЭТ 4х15мл',
    kcal: 100,
    portion_size: 15,
    price: 1000,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 8,
    measure_id: 2,
    name: 'ФЭЙМОС ГРАУЗ',
    description: 'Шотландия',
    kcal: 100,
    portion_size: 50,
    price: 270,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 9,
    measure_id: 5,
    name: 'CHIANTI SERRISTORI',
    description: 'сухое / санджовезе и другие / Италия, Тоскана',
    kcal: 100,
    portion_size: 1,
    price: 340,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 9,
    measure_id: 6,
    name: 'AMARONE DELLA VALPOLICELLA',
    description: 'полусухое / корвина, рондинелла, корвиноне / Венето',
    kcal: 100,
    portion_size: 1,
    price: 6900,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 10,
    measure_id: 5,
    name: 'PINOT GRIGIO DELLE VENEZIE',
    description: 'полусухое / пино гриджио / Италия, Венето',
    kcal: 100,
    portion_size: 1,
    price: 270,
    file_id: 1,
    createdAt: new Date(),
  },
  {
    subcategory_id: 10,
    measure_id: 6,
    name: 'VIE DI ROMANS CHARDONNAY',
    description: 'сухое / шардоне / Фриули-Венеция-Джулия',
    kcal: 100,
    portion_size: 1,
    price: 5500,
    file_id: 1,
    createdAt: new Date(),
  },
];

module.exports = positions;
