
export function equalPayments(creator, participants, repayments, cost) {
  const splitAmount = cost / participants.length;
  for (const user of participants) {
    repayments.push([creator.id, user.id, splitAmount])
  }
}

export function exactPayments(creator, participants, participantAmounts, repayments, cost) {
  let total = 0;
  participantAmounts.forEach(amount => total += amount);
  if (total !== cost) {
    return "Unequal payments";
  }
  for (let i = 0; i < participants.length; i++) {
    const user = participants[i];
    const userOwes = participantAmounts[i];
    repayments.push([creator.id, user.id, userOwes])
  }
}

export function percentPayments(creator,
   participants, 
   participantPercentages, 
   repayments, 
   cost) {
    let total = 0;
    participantPercentages.forEach(percent => total += percent)
    if (total !== 100) {
      return "Insufficient percentages"
    }
    for (let i = 0; i < participants.length; i++) {
      const user = participants[i];
      const userOwes = participantPercentages[i] * cost;
      repayments.push([creator.id, user.id, userOwes])
    }
}