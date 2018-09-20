require('dotenv').load()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const moment = require('moment')
moment.locale('th')

const FAIL_STACK_TABLE = {
  accessory: {
    1: {
      name: 'เอก',
      base: 15,
      perStack: 1.5,
      stackCap: 25
    },
    2: {
      name: 'โท',
      base: 7.5,
      perStack: 0.75,
      stackCap: 35
    },
    3: {
      name: 'ตรี',
      base: 5,
      perStack: 0.5,
      stackCap: 44
    },
    4: {
      name: 'จัตวา',
      base: 2,
      perStack: 0.25,
      stackCap: 90
    },
    5: {
      name: 'เบญจ',
      base: 1.5,
      perStack: 0.25,
      stackCap: 124
    }
  },
  life: {
    1: {
      name: '+1',
      base: 30,
      perStack: 0,
      stackCap: 2
    },
    2: {
      name: '+2',
      base: 10,
      perStack: 1,
      stackCap: 7
    },
    3: {
      name: '+3',
      base: 5,
      perStack: 0.5,
      stackCap: 24
    },
    4: {
      name: '+4',
      base: 2,
      perStack: 0.25,
      stackCap: 42
    },
    5: {
      name: '+5',
      base: 1.5,
      perStack: 0.15,
      stackCap: 72
    }
  },
  weapon: {
    1: {
      name: '+1',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    2: {
      name: '+2',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    3: {
      name: '+3',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    4: {
      name: '+4',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    5: {
      name: '+5',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    6: {
      name: '+6',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    7: {
      name: '+7',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    8: {
      name: '+8',
      base: 20,
      perStack: 2.5,
      stackCap: 13
    },
    9: {
      name: '+9',
      base: 17.5,
      perStack: 2,
      stackCap: 14
    },
    10: {
      name: '+10',
      base: 15,
      perStack: 1.5,
      stackCap: 15
    },
    11: {
      name: '+11',
      base: 12.5,
      perStack: 1.25,
      stackCap: 16
    },
    12: {
      name: '+12',
      base: 10,
      perStack: 0.75,
      stackCap: 18
    },
    13: {
      name: '+13',
      base: 7.5,
      perStack: 0.63,
      stackCap: 20
    },
    14: {
      name: '+14',
      base: 5,
      perStack: 0.5,
      stackCap: 25
    },
    15: {
      name: '+15',
      base: 2.5,
      perStack: 0.5,
      stackCap: 25
    },
    16: {
      name: 'เอก',
      base: 15,
      perStack: 1.5,
      stackCap: 25
    },
    17: {
      name: 'โท',
      base: 7.5,
      perStack: 0.75,
      stackCap: 35
    },
    18: {
      name: 'ตรี',
      base: 5,
      perStack: 0.5,
      stackCap: 44
    },
    19: {
      name: 'จัตวา',
      base: 2,
      perStack: 0.25,
      stackCap: 90
    },
    20: {
      name: 'เบญจ',
      base: 1.5,
      perStack: 0.15,
      stackCap: 124
    }
  },
  armor: {
    1: {
      name: '+1',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    2: {
      name: '+2',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    3: {
      name: '+3',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    4: {
      name: '+4',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    5: {
      name: '+5',
      base: 100,
      perStack: 0,
      stackCap: 0
    },
    6: {
      name: '+6',
      base: 20,
      perStack: 2.5,
      stackCap: 13
    },
    7: {
      name: '+7',
      base: 17.5,
      perStack: 2,
      stackCap: 14
    },
    8: {
      name: '+8',
      base: 16.25,
      perStack: 1.75,
      stackCap: 14
    },
    9: {
      name: '+9',
      base: 15,
      perStack: 1.5,
      stackCap: 15
    },
    10: {
      name: '+10',
      base: 12.5,
      perStack: 1.25,
      stackCap: 16
    },
    11: {
      name: '+11',
      base: 11.25,
      perStack: 1,
      stackCap: 17
    },
    12: {
      name: '+12',
      base: 10,
      perStack: 0.75,
      stackCap: 18
    },
    13: {
      name: '+13',
      base: 7.5,
      perStack: 0.63,
      stackCap: 20
    },
    14: {
      name: '+14',
      base: 5,
      perStack: 0.5,
      stackCap: 25
    },
    15: {
      name: '+15',
      base: 2.5,
      perStack: 0.5,
      stackCap: 25
    },
    16: {
      name: 'เอก',
      base: 15,
      perStack: 1.5,
      stackCap: 25
    },
    17: {
      name: 'โท',
      base: 7.5,
      perStack: 0.75,
      stackCap: 35
    },
    18: {
      name: 'ตรี',
      base: 5,
      perStack: 0.5,
      stackCap: 44
    },
    19: {
      name: 'จัตวา',
      base: 2,
      perStack: 0.25,
      stackCap: 90
    },
    20: {
      name: 'เบญจ',
      base: 1.5,
      perStack: 0.15,
      stackCap: 124
    }
  }
}

const FAIAL_STACK_TITLE = {
  accessory: ':ring: **เครื่องประดับ**',
  life: ':dress: ชุดเฉพาะทาง',
  weapon: ':crossed_swords: **อาวุธ**',
  armor: ':shield: **เครื่องป้องกัน**'
}

const ENCHANT_PLACE = [{
    name: 'โบสถ์ไฮเดล',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446032733832085515/2018-05-16_380701394.JPG'
  },
  {
    name: 'หน้าแก๊งแก๊งแก๊ง ไฮเดล',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446032964891967498/2018-05-16_380798020.JPG'
  },
  {
    name: 'บูชาเทพเจ้าแกะ ณ โบสถ์ไฮเดล',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446033015731388436/2018-03-19_336306966.JPG'
  },
  {
    name: 'ริมแม่นำ้เดมิข้างคลังไฮเดล เอาตัวจุ่มนำ้ครึ่งนึง',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446033204017758209/2018-05-16_380850890.JPG'
  },
  {
    name: 'ศาลเจ้าบ้านคุณเจา',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446033420955418634/2018-05-16_380908777.JPG'
  },
  {
    name: 'ศาลเจ้าไอตู้',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446033604011622420/2018-05-16_380950478.JPG'
  },
  {
    name: 'หน้าตลาดกลางสามแยกไฮเดล',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446033824904642570/2018-05-16_380994697.JPG'
  },
  {
    name: 'ข้างซีป๊อป',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446034420135362570/2018-05-16_381114561.JPG'
  },
  {
    name: 'บ้านมึงเอง',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446034541459669002/2018-05-16_381180698.JPG'
  },
  {
    name: 'หอระฆังโบสถ์ไฮเดล',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446034804786593802/2018-05-16_381242166.JPG'
  },
  {
    name: 'หลังคาคลังไฮเดล',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446035211164057610/2018-05-16_381334078.JPG'
  },
  {
    name: 'ก้อนหินหลังคลังไฮเดล',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446035363811819540/2018-05-16_381374383.JPG'
  },
  {
    name: 'บนหลังคาคลังเวเรีย',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446036773517262858/unknown.png'
  },
  {
    name: 'เสาข้างตลาดเวเรีย',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446037069156843520/unknown.png'
  },
  {
    name: 'หน้าnpcซ่อมของเวเรีย',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446037804804472832/unknown.png'
  },
  {
    name: 'ผาแห่งความสิ้นหวัง ริมทะเลเวเรีย',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446038660182179850/2018-05-16_45889630.JPG'
  },
  {
    name: '4 แยกแถวคลังเวเรียพร้อมถอยหลัง 3 ก้าว',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446039529263071244/unknown.png'
  },
  {
    name: 'ร้านซื้อของทำอาหารเวเรีย',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446040122312622080/unknown.png'
  },
  {
    name: 'ไปแบกแกะมาในโบสถ์ไฮเดล',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446041069927268362/2018-03-08_386584571.JPG'
  },
  {
    name: 'หน้าบ้าน FrostIceEiEi',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446042056176173057/unknown.png'
  },
  {
    name: 'หน้าแอลคนลดของ',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446042809527566355/unknown.png'
  },
  {
    name: 'บนน้ำพุไฮเดล',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446043217205657611/unknown.png'
  },
  {
    name: 'วิหารคามาซิลฟ์',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446044378373292043/unknown.png'
  },
  {
    name: 'ชั้น 2 บ้านหัวกิล',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446045418120413184/unknown.png'
  },
  {
    name: 'แมวข้างแก่งแก้งแก๊ง',
    image: 'https://cdn.discordapp.com/attachments/446030495923437579/446046018417590283/unknown.png'
  }
]

const BID_DELAY_TABLE = {
  item: 15,
  horse: 10
}

let ASCII = {
  sheep: [],
  panda: []
}

let HELP = {}

let PREFIX = '!'

function init() {
  ['sheep', 'panda'].forEach(type => {
    let path = `ascii/${type}`

    fs.readdir(path, (error, files) => {
      files.forEach(file => {
        ASCII[type].push(fs.readFileSync(`${path}/${file}`, 'utf8'))
      })
    })
  })

  (() => {
    let path = 'help'

    fs.readdir(path, (error, files) => {
      files.forEach(file => {
        HELP[file.replace('.md', '')] = fs.readFileSync(`${path}/${file}`, 'utf8')
      })
    })
  })();

  (() => {
    Object.keys(FAIL_STACK_TABLE).forEach(function (type) {
      Object.keys(FAIL_STACK_TABLE[type]).forEach(function (level) {
        let data = FAIL_STACK_TABLE[type][level]

        FAIL_STACK_TABLE[type][level].maxChance = data.base + (data.perStack * data.stackCap)
      })
    })
  })();
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function convertEquipmentType(type) {
  switch (type) {
    case 'l':
    case 'life':
      return 'life'

    case 'acc':
    case 'accessory':
      return 'accessory'

    case 'w':
    case 'weapon':
      return 'weapon'

    case 'ar':
    case 'armor':
      return 'armor'

    default:
      return false
  }
}

function calculateEnchantChance(type, level, stack) {
  let data = FAIL_STACK_TABLE[type][level]

  if (data === undefined) {
    return false
  }

  if (stack > data.stackCap) {
    stack = data.stackCap
  }

  data.chance = data.base + (data.perStack * stack)

  return data
}

function calculateEnchant(type, level, stack) {
  let data = calculateEnchantChance(type, level, stack)

  if (!data) {
    return false
  }

  let title = FAIAL_STACK_TITLE[type]

  return `
${title} (**${data.name}**)
ระดับการตีบวก: **${level - 1}** -> **${level}**

โอกาสสำเร็จ: **${data.chance.toFixed(2)}%** (**${stack}** Fail Stack)
โอกาสสำเร็จสูงสุด: **${data.maxChance.toFixed(2)}%** (**${data.stackCap}** Fail Stack)
`
}

function showEnchant(type, level) {
  let data = FAIL_STACK_TABLE[type][level]

  if (!data) {
    return false
  }

  let title = FAIAL_STACK_TITLE[type]

  return `
${title} (**${data.name}**)
ระดับการตีบวก: **${level - 1}** -> **${level}**

โอกาสสำเร็จ: **${data.perStack.toFixed(2)}%** (ต่อ 1 Fail Stack)
โอกาสสำเร็จต่ำสุด: **${data.base.toFixed(2)}%** (**0** Fail Stack)
โอกาสสำเร็จสูงสุด: **${data.maxChance.toFixed(2)}%** (**${data.stackCap}** Fail Stack)
`
}

function randomASCIIArt(type) {
  let size = ASCII[type].length

  return ASCII[type][randomIntFromInterval(1, size) - 1]
}

function randomEnchantPlace() {
  let size = ENCHANT_PLACE.length

  return ENCHANT_PLACE[randomIntFromInterval(1, size) - 1]
}

function help(type) {
  if (HELP[type] === undefined) {
    return ':no_entry_sign: ไม่เจอข้อมูลที่ค้นหา'
  }

  return HELP[type]
}

function doFs(chat, equipmentType, enchantLevel, failStack = undefined) {
  equipmentType = convertEquipmentType(equipmentType)

  if (!equipmentType) {
    chat.channel.send(':no_entry_sign: ไม่เจอข้อมูลอุปกรณ์สวมใส่ที่เลือก')

    return
  }

  let response

  if (failStack === undefined) {
    response = showEnchant(equipmentType, enchantLevel)
  } else {
    response = calculateEnchant(equipmentType, enchantLevel, failStack)
  }

  if (!response) {
    chat.channel.send(':no_entry_sign: ไม่เจอข้อมูล')

    return
  }

  chat.channel.send(response)
}

function doEnchant(chat, equipmentType, enchantLevel, failStack) {
  equipmentType = convertEquipmentType(equipmentType)

  if (!equipmentType) {
    chat.channel.send(':no_entry_sign: ไม่เจอข้อมูลอุปกรณ์ที่เลือก')

    return
  }

  let response = calculateEnchantChance(equipmentType, enchantLevel, failStack)
  let chance = parseInt(response.chance * 100)
  let random = randomIntFromInterval(1, 10000)
  let title = FAIAL_STACK_TITLE[equipmentType]

  if (random <= chance) {
    chat.channel.send(`ท่าน [${chat.member}] ได้รับ [${response.name} ${title}] เพิ่มประสิทธิภาพสำเร็จ`)
  } else {
    chat.channel.send(`[${chat.member}] พ่ายแพ้ [${response.name} ${title}] เพิ่มประสิทธิภาพล้มเหลว`)
  }
}

function doBid(chat, type, item, times) {
  let time = moment().set({
    hour: parseInt(times[0]),
    minute: parseInt(times[1]),
    second: 0,
    millisecond: 0,
  })

  let delay = BID_DELAY_TABLE[type]

  time.add(delay, 'minutes')
  let timeDiffInMinute = time.diff(moment(), 'minutes')

  if (timeDiffInMinute < 0 || timeDiffInMinute > delay) {
    chat.channel.send(':no_entry_sign: เวลาประมูลของไม่ถูกต้อง')

    return
  }

  chat.channel.send(`:money_with_wings: **${item}** ${time.fromNow()} จะลงตลาด (${time.format('HH:mm')})`)

  setTimeout((chat, item, time) => {
    chat.channel.send(`:money_with_wings: ${chat.member} **${item}** กำลังจะลงตลาด ${time.fromNow()} (${time.format('HH:mm')}) เตรียมไปประมูลของด้วย!`)
  }, time.clone().subtract(1, 'minutes').diff(moment(), 'milliseconds'), chat, item, time)
}

function doPanda(chat) {
  chat.channel.send(randomASCIIArt('panda'))
}

function doSheep(chat) {
  chat.channel.send(randomASCIIArt('sheep'))
}

function doEnchantPlace(chat) {
  let data = randomEnchantPlace()

  chat.channel.send(`
**${data.name}**
`, {
    file: data.image
  })
}

function doChangePrefix(chat, prefix) {
  chat.channel.send(`:wrench: คำสั่งถูกเปลี่ยนจาก \`${PREFIX}\` เป็น \`${prefix}\``)

  PREFIX = prefix
}

function doHelp(chat, type) {
  chat.channel.send(help(type))
}

client.on('ready', () => {
  init()
})

client.on('message', chat => {
  let content = chat.content.toLocaleLowerCase()

  if (content.startsWith(PREFIX)) {
    let params = content.split(' ')
    params[0] = params[0].slice(1)

    switch (params[0]) {
      case 'fs':
        if (params.length !== 3 && params.length !== 4) {
          return doHelp(chat, 'fs')
        }

        let failStack = parseInt(params[3])

        if (!failStack) {
          failStack = undefined
        }

        return doFs(chat, params[1], parseInt(params[2]), failStack)

      case 'enc':
        if (params.length !== 4) {
          return doHelp(chat, 'enc')
        }

        return doEnchant(chat, params[1], parseInt(params[2]), parseInt(params[3]))

      case 'bid':
        if (params.length !== 3) {
          return doHelp(chat, 'bid')
        }

        let bidTimes = params[2].split('.')

        if (bidTimes.length !== 2) {
          return doHelp(chat, 'bid')
        }

        return doBid(chat, 'item', params[1], bidTimes)

      case 'horse':
        if (params.length !== 3) {
          return doHelp(chat, 'horse')
        }

        let horseTimes = params[2].split('.')

        if (horseTimes.length !== 2) {
          return doHelp(chat, 'horse')
        }

        return doBid(chat, 'horse', params[1], horseTimes)

      case 'บูชาเทพเจ้าแพนด้า':
        return doPanda(chat)

      case 'บูชาเทพเจ้าแกะ':
        return doSheep(chat)

      case 'ตีบวกไหนดีวะ':
        return doEnchantPlace(chat)

      case 'prefix':
        return doChangePrefix(chat, params[1])

      case 'help':
        return doHelp(chat, 'help')
    }
  }
})

client.login(process.env.BOT_TOKEN)
console.log('Overbot is runing.')