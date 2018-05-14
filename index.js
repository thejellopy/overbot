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
      stackCap: 25,
      maxChance: 52.5
    },
    2: {
      name: 'โท',
      base: 7.5,
      perStack: 0.75,
      stackCap: 35,
      maxChance: 33.75
    },
    3: {
      name: 'ตรี',
      base: 5,
      perStack: 0.5,
      stackCap: 44,
      maxChance: 27
    },
    4: {
      name: 'จัตวา',
      base: 2,
      perStack: 0.25,
      stackCap: 90,
      maxChance: 24.5
    },
    5: {
      name: 'เบญจ',
      base: 1.5,
      perStack: 0.25,
      stackCap: 124,
      maxChance: 32.5
    }
  },
  life: {
    1: {
      name: '+1',
      base: 30,
      perStack: 0,
      stackCap: 2,
      maxChance: 30
    },
    2: {
      name: '+2',
      base: 10,
      perStack: 1,
      stackCap: 7,
      maxChance: 17
    },
    3: {
      name: '+3',
      base: 5,
      perStack: 0.5,
      stackCap: 24,
      maxChance: 17
    },
    4: {
      name: '+4',
      base: 2,
      perStack: 0.25,
      stackCap: 42,
      maxChance: 12.5
    },
    5: {
      name: '+5',
      base: 1.5,
      perStack: 0.15,
      stackCap: 72,
      maxChance: 12.3
    }
  },
  weapon: {
    1: {
      name: '+1',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    2: {
      name: '+2',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    3: {
      name: '+3',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    4: {
      name: '+4',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    5: {
      name: '+5',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    6: {
      name: '+6',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    7: {
      name: '+7',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    8: {
      name: '+8',
      base: 20,
      perStack: 2.5,
      stackCap: 13,
      maxChance: 52.5
    },
    9: {
      name: '+9',
      base: 17.5,
      perStack: 2,
      stackCap: 14,
      maxChance: 45.5
    },
    10: {
      name: '+10',
      base: 15,
      perStack: 1.5,
      stackCap: 15,
      maxChance: 37.5
    },
    11: {
      name: '+11',
      base: 12.5,
      perStack: 1.25,
      stackCap: 16,
      maxChance: 32.5
    },
    12: {
      name: '+12',
      base: 10,
      perStack: 0.75,
      stackCap: 18,
      maxChance: 23.5
    },
    13: {
      name: '+13',
      base: 7.5,
      perStack: 0.63,
      stackCap: 20,
      maxChance: 20.1
    },
    14: {
      name: '+14',
      base: 5,
      perStack: 0.5,
      stackCap: 25,
      maxChance: 17.5
    },
    15: {
      name: '+15',
      base: 2.5,
      perStack: 0.5,
      stackCap: 25,
      maxChance: 15
    },
    16: {
      name: 'เอก',
      base: 15,
      perStack: 1.5,
      stackCap: 25,
      maxChance: 52.5
    },
    17: {
      name: 'โท',
      base: 7.5,
      perStack: 0.75,
      stackCap: 35,
      maxChance: 33.75
    },
    18: {
      name: 'ตรี',
      base: 5,
      perStack: 0.5,
      stackCap: 44,
      maxChance: 27
    },
    19: {
      name: 'จัตวา',
      base: 2,
      perStack: 0.25,
      stackCap: 90,
      maxChance: 25
    },
    20: {
      name: 'เบญจ',
      base: 1.5,
      perStack: 0.15,
      stackCap: 124,
      maxChance: 20.1
    }
  },
  armor: {
    1: {
      name: '+1',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    2: {
      name: '+2',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    3: {
      name: '+3',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    4: {
      name: '+4',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    5: {
      name: '+5',
      base: 100,
      perStack: 0,
      stackCap: 0,
      maxChance: 100
    },
    6: {
      name: '+6',
      base: 20,
      perStack: 2.5,
      stackCap: 13,
      maxChance: 52.5
    },
    7: {
      name: '+7',
      base: 17.5,
      perStack: 2,
      stackCap: 14,
      maxChance: 45.5
    },
    8: {
      name: '+8',
      base: 16.25,
      perStack: 1.75,
      stackCap: 14,
      maxChance: 40.75
    },
    9: {
      name: '+9',
      base: 15,
      perStack: 1.5,
      stackCap: 15,
      maxChance: 37.5
    },
    10: {
      name: '+10',
      base: 12.5,
      perStack: 1.25,
      stackCap: 16,
      maxChance: 32.5
    },
    11: {
      name: '+11',
      base: 11.25,
      perStack: 1,
      stackCap: 17,
      maxChance: 28.25
    },
    12: {
      name: '+12',
      base: 10,
      perStack: 0.75,
      stackCap: 18,
      maxChance: 23.5
    },
    13: {
      name: '+13',
      base: 7.5,
      perStack: 0.63,
      stackCap: 20,
      maxChance: 20.1
    },
    14: {
      name: '+14',
      base: 5,
      perStack: 0.5,
      stackCap: 25,
      maxChance: 17.5
    },
    15: {
      name: '+15',
      base: 2.5,
      perStack: 0.5,
      stackCap: 25,
      maxChance: 15
    },
    16: {
      name: 'เอก',
      base: 15,
      perStack: 1.5,
      stackCap: 25,
      maxChance: 52.5
    },
    17: {
      name: 'โท',
      base: 7.5,
      perStack: 0.75,
      stackCap: 35,
      maxChance: 33.75
    },
    18: {
      name: 'ตรี',
      base: 5,
      perStack: 0.5,
      stackCap: 44,
      maxChance: 27
    },
    19: {
      name: 'จัตวา',
      base: 2,
      perStack: 0.25,
      stackCap: 90,
      maxChance: 25
    },
    20: {
      name: 'เบญจ',
      base: 1.5,
      perStack: 0.15,
      stackCap: 124,
      maxChance: 20.1
    }
  }
}

const FAIAL_STACK_TITLE = {
  accessory: ':ring: **เครื่องประดับ**',
  life: ':dress: ชุดเฉพาะทาง',
  weapon: ':crossed_swords: **อาวุธ**',
  armor: ':shield: **เครื่องป้องกัน**'
}

let ASCII = {
  sheep: [],
  panda: []
}

let HELP = {}

let CHANNEL

function init() {
  ['sheep', 'panda'].forEach(type => {
    let path = `ascii/${type}`

    fs.readdir(path, (error, files) => {
      files.forEach(file => {
        ASCII[type].push(fs.readFileSync(`${path}/${file}`, 'utf8'))
      });
    })
  });

  (() => {
    let path = 'help'

    fs.readdir(path, (error, files) => {
      files.forEach(file => {
        HELP[file.replace('.md', '')] = fs.readFileSync(`${path}/${file}`, 'utf8')
      });
    })
  })()
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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

  if (! data) {
    return false
  }

  let title = FAIAL_STACK_TITLE[type]

  return `
${title} (**${data.name}**)
ระดับการตีบวก: **${level - 1}** -> **${level}**
Fail Stack: **${stack}**

โอกาสสำเร็จ: **${data.chance.toFixed(2)}%**
`
}

function showEnchant(type, level) {
  let data = FAIL_STACK_TABLE[type][level]

  if (! data) {
    return false
  }

  let title = FAIAL_STACK_TITLE[type]

  return`
${title} (**${data.name}**)
ระดับการตีบวก: **${level - 1}** -> **${level}**

โอกาสสำเร็จต่ำสุด: **${data.base.toFixed(2)}%** (**0** Fail Stack)
โอกาสสำเร็จสูงสุด: **${data.maxChance.toFixed(2)}%** (**${data.stackCap}** Fail Stack)
`
}

function randomASCIIArt(type) {
  let size = ASCII[type].length

  return ASCII[type][randomIntFromInterval(1, size) - 1]
}

function help(type) {
  if (HELP[type] === undefined) {
    return ':no_entry_sign: ไม่เจอข้อมูลที่ค้นหา'
  }

  return HELP[type]
}

function doFs(chat, equipmentType, enchantLevel, failStack = undefined) {
  equipmentType = convertEquipmentType(equipmentType)

  if (! equipmentType) {
    CHANNEL.send(':no_entry_sign: ไม่เจอข้อมูลอุปกรณ์สวมใส่ที่เลือก')

    return
  }

  let response

  if (failStack === undefined) {
    response = showEnchant(equipmentType, enchantLevel)
  } else {
    response = calculateEnchant(equipmentType, enchantLevel, failStack)
  }

  if (! response) {
    CHANNEL.send(':no_entry_sign: ไม่เจอข้อมูล')

    return
  }

  CHANNEL.send(response)
}

function doEnchant(chat, equipmentType, enchantLevel, failStack) {
  equipmentType = convertEquipmentType(equipmentType)

  if (! equipmentType) {
    CHANNEL.send(':no_entry_sign: ไม่เจอข้อมูลอุปกรณ์ที่เลือก')

    return
  }

  let response = calculateEnchantChance(equipmentType, enchantLevel, failStack)
  let chance = parseInt(response.chance * 100)
  let random = randomIntFromInterval(1, 10000)
  let title = FAIAL_STACK_TITLE[equipmentType]

  if (random <= chance) {
    CHANNEL.send(`ท่าน [${chat.member}] ได้รับ [${response.name} ${title}] เพิ่มประสิทธิภาพสำเร็จ`)
  } else {
    CHANNEL.send(`[${chat.member}] พ่ายแพ้ [${response.name} ${title}] เพิ่มประสิทธิภาพล้มเหลว`)
  }
}

function doBid(chat, item, times) {
  let time = moment().set({
    hour: parseInt(times[0]),
    minute: parseInt(times[1]),
    second: 0,
    millisecond: 0,
  })

  time.add(15, 'minutes')
  let timeDiffInMinute = time.diff(moment(), 'minutes')

  if (timeDiffInMinute < 0 || timeDiffInMinute > 15) {
    CHANNEL.send(':no_entry_sign: เวลาประมูลของไม่ถูกต้อง')

    return
  }

  CHANNEL.send(`:money_with_wings: **${item}** ${time.fromNow()} จะลงตลาด (${time.format('HH:mm')})`)

  setTimeout((chat, item, time) => {
    CHANNEL.send(`:money_with_wings: ${chat.member} **${item}** กำลังจะลงตลาด ${time.fromNow()} (${time.format('HH:mm')}) เตรียมไปประมูลของด้วย!`)
  }, time.clone().subtract(1, 'minutes').diff(moment(), 'milliseconds'), chat, item, time);
}

function doPanda(chat) {
  CHANNEL.send(randomASCIIArt('panda'))
}

function doSheep(chat) {
  CHANNEL.send(randomASCIIArt('sheep'))
}

function doHelp(chat, type) {
  CHANNEL.send(help(type))
}

client.on('ready', () => {
  init()

  CHANNEL = client.channels.find('id', process.env.CHANNEL_ID)
});

client.on('message', chat => {
  let content = chat.content.toLocaleLowerCase()

  if (content.startsWith('!')) {
    let params = content.split(' ')

    switch (params[0]) {
      case '!fs':
        if (params.length !== 3 && params.length !== 4) {
          return doHelp(chat, 'fs')
        }

        let failStack = parseInt(params[3])

        if (! failStack) {
          failStack = undefined
        }

        return doFs(chat, params[1], parseInt(params[2]), failStack)

      case '!enc':
        if (params.length !== 4) {
          return doHelp(chat, 'enc')
        }

        return doEnchant(chat, params[1], parseInt(params[2]), parseInt(params[3]))
      
      case '!bid':
        if (params.length !== 3) {
          return doHelp(chat, 'bid')
        }
      
        let times = params[2].split('.')
      
        if (times.length !== 2) {
          return doHelp(chat, 'bid')
        }

        return doBid(chat, params[1], times)

      case '!panda':
        return doPanda(chat)

      case '!sheep':
        return doSheep(chat)

      default:
        return doHelp(chat, 'help')
    }
  }
});

client.login(process.env.BOT_TOKEN)