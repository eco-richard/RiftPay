
// export function equalPayments(creator, participants, debtInputs, cost) {
//   let repayments = [];
//   const splitAmount = cost / participants.length;
//   for (const user of participants) {
//     repayments.push([creator.id, user.id, splitAmount])
//   }
//   return repayments
// }

export function exactPayments(creatorId, participants, debtInput, cost) {
  let repayments = [];
  let total = 0;
  for (let i in debtInput) {
    total += parseInt(debtInput[i])
  }
  if (total != cost) {
    return "Unequal payments";
  }
  for (let i = 0; i < participants.length; i++) {
    repayments.push(`${creatorId}/${participants[i]}/${debtInput[participants[i]]}`)
  }
  return repayments.join(',')
}

export function percentPayments(creatorId, participants, debtInput, cost) {
    let repayments = [];
    let total = 0;
    for (let i in debtInput) {
      total += parseInt(debtInput[i])
    }
    if (total !== 100) {
      return "Insufficient percentages"
    }
    for (let i = 0; i < participants.length; i++) {
      const userOwes = parseInt(debtInput[participants[i]]/100)*parseInt(cost)
      repayments.push(`${creatorId}/${participants[i]}/${userOwes}`)
    }
    return repayments.join(',')
}
