function BufferDataAdapter(payload, class_1 = payload.bufferData.class_1) {
  let result = { ...payload.bufferData }
  let boost = 1
  let favoritism = 1
  switch (class_1) {
    case '炽天使':
      boost = 1.3
      break
    case '神思者':
      boost = 1
      break
    case '冥月女神':
      boost = 1.25
      favoritism = 1.15
      break
  }
  if (!payload.boost) {
    boost = 1
  }
  if (!payload.favoritism) {
    favoritism = 1
  }
  result.buff_default = Number((Number(result.buff_default) * boost * favoritism).toFixed(0))
  result.buff_atk = Number((Number(result.buff_atk) * boost * favoritism).toFixed(0))
  return result
}

function GetLiftRatio(payload, class_1 = payload.bufferData.class_1) {
  let ratio = 0
  const buffStrInt = Number(payload.bufferData.buff_default)
  const buffAtk = Number(payload.bufferData.buff_atk)
  const buffBurst = Number(payload.bufferData.buff_burst)

  const templateCharacter = payload.templateCharacter
  let systemBuff = templateCharacter.systemBuff

  let buffer = {
    boost: 1,
    favoritism: 1,
    aura: 0
  }

  if (!payload.hasSystemBuff) {
    systemBuff = 0
  } 

  switch (class_1) {
    case '炽天使':
      buffer.boost = 1.3
      buffer.aura = 500
      break
    case '神思者':
      buffer.boost = 1
      buffer.aura = 300
      break
    case '冥月女神':
      buffer.boost = 1.25
      buffer.aura = 500
      buffer.favoritism = 1.15
      break
  }
  if (!payload.boost) {
    buffer.boost = 1
  }
  if (!payload.favoritism) {
    buffer.favoritism = 1
  }
  ratio =
    ((buffStrInt * buffer.boost * buffer.favoritism +
      buffBurst +
      buffer.aura +
      systemBuff +
      templateCharacter.strInt) *
      (buffAtk * buffer.boost * buffer.favoritism + templateCharacter.atk))
  ratio = ratio / (templateCharacter.atk * (templateCharacter.strInt + systemBuff))
  return Number(ratio.toFixed(2))
}
export default {
  BufferDataAdapter,
  GetLiftRatio
}