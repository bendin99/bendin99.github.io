// Základní tabulka - lokální čas
const BASE_TABLE = [
  { start: "00:00", end: "04:59", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] },
  { start: "05:00", end: "05:14", values: ["12:00", "12:00", "11:30", "11:00", "10:30"] },
  { start: "05:15", end: "05:29", values: ["12:15", "12:15", "11:45", "11:15", "10:45"] },
  { start: "05:30", end: "05:44", values: ["12:30", "12:30", "12:00", "11:30", "11:00"] },
  { start: "05:45", end: "05:59", values: ["12:45", "12:45", "12:15", "11:45", "11:15"] },
  { start: "06:00", end: "06:14", values: ["13:00", "13:00", "12:30", "12:00", "11:30"] },
  { start: "06:15", end: "13:29", values: ["13:00", "13:00", "12:30", "12:00", "11:30"] },
  { start: "13:30", end: "13:59", values: ["12:45", "12:45", "12:15", "11:45", "11:15"] },
  { start: "14:00", end: "14:29", values: ["12:30", "12:30", "12:00", "11:30", "11:00"] },
  { start: "14:30", end: "14:59", values: ["12:15", "12:15", "11:45", "11:15", "10:45"] },
  { start: "15:00", end: "15:29", values: ["12:00", "12:00", "11:30", "11:00", "10:30"] },
  { start: "15:30", end: "15:59", values: ["11:45", "11:45", "11:15", "10:45", "10:15"] },
  { start: "16:00", end: "16:29", values: ["11:30", "11:30", "11:00", "10:30", "10:00"] },
  { start: "16:30", end: "16:59", values: ["11:15", "11:15", "10:45", "10:15", "09:45"] },
  { start: "17:00", end: "17:29", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] },
  { start: "17:30", end: "17:59", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] },
  { start: "18:00", end: "18:29", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] },
  { start: "18:30", end: "18:59", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] },
  { start: "19:00", end: "23:59", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] }
];

const EXTENDED_TABLE = [
  { start: "19:00", end: "04:59", values: ["11:00", "11:00", "10:30", "10:00", "09:30"], overnight: true },
  { start: "05:00", end: "05:14", values: ["12:00", "12:00", "11:30", "11:00", "10:30"] },
  { start: "05:15", end: "05:29", values: ["12:15", "12:15", "11:45", "11:15", "10:45"] },
  { start: "05:30", end: "05:44", values: ["12:30", "12:30", "12:00", "11:30", "11:00"] },
  { start: "05:45", end: "05:59", values: ["12:45", "12:45", "12:15", "11:45", "11:15"] },
  { start: "06:00", end: "06:14", values: ["13:00", "13:00", "12:30", "12:00", "11:30"] },
  { start: "06:15", end: "06:29", values: ["13:15", "13:15", "12:45", "12:15", "11:45"] },
  { start: "06:30", end: "06:44", values: ["13:30", "13:30", "13:00", "12:30", "12:00"] },
  { start: "06:45", end: "06:59", values: ["13:45", "13:45", "13:15", "12:45", "12:15"] },
  { start: "07:00", end: "13:29", values: ["14:00", "14:00", "13:30", "13:00", "12:30"] },
  { start: "13:30", end: "13:59", values: ["13:45", "13:45", "13:15", "12:45", "11:15"] },
  { start: "14:00", end: "14:29", values: ["13:30", "13:30", "13:00", "12:30", "11:00"] },
  { start: "14:30", end: "14:59", values: ["13:15", "13:15", "12:45", "12:15", "10:45"] },
  { start: "15:00", end: "15:29", values: ["13:00", "13:00", "12:30", "12:00", "10:30"] },
  { start: "15:30", end: "15:59", values: ["12:45", "12:45", "11:15", "10:45", "10:15"] },
  { start: "16:00", end: "16:29", values: ["12:30", "12:30", "11:00", "10:30", "10:00"] },
  { start: "16:30", end: "16:59", values: ["12:15", "12:15", "10:45", "10:15", "09:45"] },
  { start: "17:00", end: "17:29", values: ["12:00", "12:00", "10:30", "10:00", "09:30"] },
  { start: "17:30", end: "17:59", values: ["11:45", "11:45", "10:30", "10:00", "09:30"] },
  { start: "18:00", end: "18:29", values: ["11:30", "11:30", "10:30", "10:00", "09:30"] },
  { start: "18:30", end: "18:59", values: ["11:15", "11:15", "10:30", "10:00", "09:30"] }
];

function toMinutes(timeString) {
  if (!timeString || !timeString.includes(":")) return 0;
  const [h, m] = timeString.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function minutesToDuration(totalMinutes) {
  const sign = totalMinutes < 0 ? "-" : "";
  const abs = Math.abs(totalMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function localToUtc(localMinutes, utcOffsetHours) {
  return localMinutes - utcOffsetHours * 60;
}

function addMinutes(timeMinutes, durationMinutes) {
  return timeMinutes + durationMinutes;
}

function diffForwardMinutes(fromMinutes, toMinutes) {
  let diff = toMinutes - fromMinutes;
  if (diff < 0) diff += 1440;
  return diff;
}

function getSelectedServiceType() {
  const selected = document.querySelector('input[name="serviceType"]:checked');
  return selected ? selected.value : "normal";
}

function getSelectedHasSby() {
  const selected = document.querySelector('input[name="hasSby"]:checked');
  return selected ? selected.value === "yes" : false;
}

function getSelectedUsePlanningCall() {
  const selected = document.querySelector('input[name="usePlanningCall"]:checked');
  return selected ? selected.value === "yes" : false;
}

function getSelectedHasDelayMessage() {
  const selected = document.querySelector('input[name="hasDelayMessage"]:checked');
  return selected ? selected.value === "yes" : false;
}

function getSelectedHasSecondDelayMessage() {
  const selected = document.querySelector('input[name="hasSecondDelayMessage"]:checked');
  return selected ? selected.value === "yes" : false;
}

function isNightMinute(minuteOfDay) {
  const normalized = ((minuteOfDay % 1440) + 1440) % 1440;
  return normalized >= 1380 || normalized < 420;
}

function isInRange(reportMinutes, startMinutes, endMinutes, overnight = false) {
  if (overnight || startMinutes > endMinutes) {
    return reportMinutes >= startMinutes || reportMinutes <= endMinutes;
  }
  return reportMinutes >= startMinutes && reportMinutes <= endMinutes;
}

function lookupTableValue(table, reportMinutes, sectors) {
  for (const row of table) {
    const start = toMinutes(row.start);
    const end = toMinutes(row.end);
    if (isInRange(reportMinutes, start, end, row.overnight)) {
      return toMinutes(row.values[sectors - 1]);
    }
  }
  return null;
}

function overlapMinutes(startA, endA, startB, endB) {
  const start = Math.max(startA, startB);
  const end = Math.min(endA, endB);
  return Math.max(0, end - start);
}

function calculateStandbyDurationFromStart(reportMinutes, sbyStartMinutes) {
  let duration = reportMinutes - sbyStartMinutes;
  if (duration < 0) duration += 1440;
  return duration;
}

function calculateBaseCountableStandbyMinutes(reportMinutes, sbyMinutes) {
  const standbyStart = reportMinutes - sbyMinutes;
  const standbyEnd = reportMinutes;

  let countable = 0;
  const firstDay = Math.floor(standbyStart / 1440);
  const lastDay = Math.floor((standbyEnd - 1) / 1440);

  for (let day = firstDay; day <= lastDay; day++) {
    const dayOffset = day * 1440;
    const countableStart = dayOffset + 7 * 60;
    const countableEnd = dayOffset + 23 * 60;

    countable += overlapMinutes(
      standbyStart,
      standbyEnd,
      countableStart,
      countableEnd
    );
  }

  return countable;
}

function calculateCountableStandbyMinutes(reportMinutes, sbyMinutes, callTimeMinutes) {
  const standbyStart = reportMinutes - sbyMinutes;
  const standbyEnd = reportMinutes;

  let countable = calculateBaseCountableStandbyMinutes(reportMinutes, sbyMinutes);

  if (callTimeMinutes === null || callTimeMinutes === undefined) {
    return countable;
  }

  const normalizedCall = ((callTimeMinutes % 1440) + 1440) % 1440;

  if (!isNightMinute(normalizedCall)) {
    return countable;
  }

  const firstDay = Math.floor(standbyStart / 1440) - 1;
  const lastDay = Math.floor(standbyEnd / 1440) + 1;
  let effectiveCallAbsolute = null;

  for (let day = firstDay; day <= lastDay; day++) {
    const candidate = day * 1440 + normalizedCall;
    if (candidate >= standbyStart && candidate <= standbyEnd) {
      effectiveCallAbsolute = candidate;
      break;
    }
  }

  if (effectiveCallAbsolute === null) {
    return countable;
  }

  const intervalStart = effectiveCallAbsolute;
  const intervalEnd = standbyEnd;
  const totalCallToReport = Math.max(0, intervalEnd - intervalStart);

  let alreadyCountedInCallToReport = 0;
  const firstOverlapDay = Math.floor(intervalStart / 1440);
  const lastOverlapDay = Math.floor((intervalEnd - 1) / 1440);

  for (let day = firstOverlapDay; day <= lastOverlapDay; day++) {
    const dayOffset = day * 1440;
    const dayStart = dayOffset + 7 * 60;
    const dayEnd = dayOffset + 23 * 60;

    alreadyCountedInCallToReport += overlapMinutes(
      intervalStart,
      intervalEnd,
      dayStart,
      dayEnd
    );
  }

  const extraNightMinutesToAdd = totalCallToReport - alreadyCountedInCallToReport;
  return countable + Math.max(0, extraNightMinutesToAdd);
}

function calculateStandbyReduction(countableStandby) {
  return Math.max(0, countableStandby - 360);
}

function formatUtcOffset(offset) {
  const sign = offset >= 0 ? "+" : "-";
  const abs = Math.abs(offset);
  const hours = Math.floor(abs);
  const minutes = Math.round((abs - hours) * 60);
  return `UTC${sign}${hours}:${String(minutes).padStart(2, "0")}`;
}

function calculateDelayLogic(originalReport, delayDuration, firstMessageTime, hasSecondDelayMessage, secondMessageTime) {
  const delayedReport = addMinutes(originalReport, delayDuration);
  const firstMessageLead = diffForwardMinutes(firstMessageTime, originalReport);
  const firstMessageValid = firstMessageLead >= 90;

  if (!firstMessageValid) {
    return {
      delayApplied: false,
      firstMessageValid: false,
      firstMessageLead,
      delayedReport,
      effectiveFdpStart: originalReport,
      limitBasisReport: originalReport,
      delayDuration: 0,
      usedMoreLimitingRule: false,
      usedSecondMessageRule: false
    };
  }

  let effectiveFdpStart = delayedReport;
  let limitBasisReport = originalReport;
  let usedMoreLimitingRule = false;
  let usedSecondMessageRule = false;

  if (delayDuration >= 240) {
    limitBasisReport = null;
    usedMoreLimitingRule = true;
  }

  if (hasSecondDelayMessage && secondMessageTime !== null) {
    const secondMessageStart = secondMessageTime + 60;
    effectiveFdpStart = Math.min(secondMessageStart, originalReport);
    usedSecondMessageRule = true;
  }

  return {
    delayApplied: true,
    firstMessageValid: true,
    firstMessageLead,
    delayedReport,
    effectiveFdpStart,
    limitBasisReport,
    delayDuration,
    usedMoreLimitingRule,
    usedSecondMessageRule
  };
}

function calculateResults() {
  const originalReport = toMinutes(document.getElementById("report")?.value || "00:00");

  const utcOffsetHours = parseInt(document.getElementById("utcOffsetHours")?.value ?? "1", 10);
  const utcOffsetHalf = parseInt(document.getElementById("utcOffsetHalf")?.value ?? "0", 10);
  const utcOffset =
    utcOffsetHours + (utcOffsetHours < 0 ? -utcOffsetHalf / 60 : utcOffsetHalf / 60);

  const sectors = parseInt(document.getElementById("sectors")?.value ?? "1", 10);
  const lastLeg = toMinutes(document.getElementById("lastLeg")?.value || "00:00");
  const taxi = toMinutes(document.getElementById("taxi")?.value || "00:00");
  const serviceType = getSelectedServiceType();

  const hasDelayMessage = getSelectedHasDelayMessage();
  const delayDuration = hasDelayMessage
    ? toMinutes(document.getElementById("delayDuration")?.value || "00:00")
    : 0;
  const firstDelayMessageTime = hasDelayMessage
    ? toMinutes(document.getElementById("firstDelayMessageTime")?.value || "00:00")
    : null;
  const hasSecondDelayMessage = hasDelayMessage ? getSelectedHasSecondDelayMessage() : false;
  const secondDelayMessageTime = hasDelayMessage && hasSecondDelayMessage
    ? toMinutes(document.getElementById("secondDelayMessageTime")?.value || "00:00")
    : null;

  const delayLogic = hasDelayMessage
    ? calculateDelayLogic(
        originalReport,
        delayDuration,
        firstDelayMessageTime,
        hasSecondDelayMessage,
        secondDelayMessageTime
      )
    : {
        delayApplied: false,
        firstMessageValid: false,
        firstMessageLead: 0,
        delayedReport: originalReport,
        effectiveFdpStart: originalReport,
        limitBasisReport: originalReport,
        delayDuration: 0,
        usedMoreLimitingRule: false,
        usedSecondMessageRule: false
      };

  const effectiveReport = delayLogic.effectiveFdpStart;
  const delayedReport = delayLogic.delayedReport;

  const hasSby = getSelectedHasSby();
  const usePlanningCall = hasSby ? getSelectedUsePlanningCall() : false;

  const sbyStart = hasSby
    ? toMinutes(document.getElementById("sbyStart")?.value || "00:00")
    : null;

  const sby = hasSby
    ? calculateStandbyDurationFromStart(effectiveReport, sbyStart)
    : 0;

  const sbyCallTime = hasSby && usePlanningCall
    ? toMinutes(document.getElementById("sbyCallTime")?.value || "00:00")
    : null;

  const selectedTable = serviceType === "extended" ? EXTENDED_TABLE : BASE_TABLE;

  const baseOriginal = lookupTableValue(BASE_TABLE, originalReport, sectors);
  const selectedOriginal = lookupTableValue(selectedTable, originalReport, sectors);
  const selectedDelayed = lookupTableValue(selectedTable, delayedReport, sectors);

  if (baseOriginal === null || selectedOriginal === null || selectedDelayed === null) {
    return { error: "Nepodařilo se najít odpovídající řádek v tabulce." };
  }

  let selectedTableFdp;
  let basisReportUsed;

  if (!delayLogic.delayApplied) {
    selectedTableFdp = selectedOriginal;
    basisReportUsed = originalReport;
  } else if (delayLogic.usedMoreLimitingRule) {
    selectedTableFdp = Math.min(selectedOriginal, selectedDelayed);
    basisReportUsed = selectedOriginal <= selectedDelayed ? originalReport : delayedReport;
  } else {
    selectedTableFdp = selectedOriginal;
    basisReportUsed = originalReport;
  }

  const baseBasisValue = lookupTableValue(BASE_TABLE, basisReportUsed, sectors);
  if (baseBasisValue === null) {
    return { error: "Nepodařilo se najít odpovídající řádek v základní tabulce." };
  }

  const plannedExtensionDifference = selectedTableFdp - baseBasisValue;
  const captainExtraFromSelectedLimit = 120 - Math.max(0, plannedExtensionDifference);
  const captainExtraApplied = Math.max(0, captainExtraFromSelectedLimit);

  const countableStandby = hasSby
    ? calculateCountableStandbyMinutes(effectiveReport, sby, sbyCallTime)
    : 0;

  const standbyReduction = calculateStandbyReduction(countableStandby);

  const maxFdp = selectedTableFdp - standbyReduction;
  const maxFdpCaptain = selectedTableFdp + captainExtraApplied - standbyReduction;

  const dutyEndLocal = effectiveReport + maxFdp;
  const dutyEndCaptainLocal = effectiveReport + maxFdpCaptain;

  const latestDepartureLocal = dutyEndLocal - lastLeg - taxi;
  const latestDepartureCaptainLocal = dutyEndCaptainLocal - lastLeg - taxi;

  const dutyEndUtc = localToUtc(dutyEndLocal, utcOffset);
  const dutyEndCaptainUtc = localToUtc(dutyEndCaptainLocal, utcOffset);
  const latestDepartureUtc = localToUtc(latestDepartureLocal, utcOffset);
  const latestDepartureCaptainUtc = localToUtc(latestDepartureCaptainLocal, utcOffset);

  return {
    error: null,
    serviceType,
    utcOffset,
    originalReport,
    effectiveReport,
    delayedReport,
    basisReportUsed,
    sectors,

    hasDelayMessage,
    delayDuration,
    firstDelayMessageTime,
    hasSecondDelayMessage,
    secondDelayMessageTime,
    delayApplied: delayLogic.delayApplied,
    firstMessageValid: delayLogic.firstMessageValid,
    firstMessageLead: delayLogic.firstMessageLead,
    usedMoreLimitingRule: delayLogic.usedMoreLimitingRule,
    usedSecondMessageRule: delayLogic.usedSecondMessageRule,

    hasSby,
    usePlanningCall,
    sbyStart,
    sby,
    sbyCallTime,
    countableStandby,
    standbyReduction,

    lastLeg,
    taxi,
    baseBasisValue,
    selectedTableFdp,
    plannedExtensionDifference,
    captainExtraApplied,
    maxFdp,
    maxFdpCaptain,
    dutyEndLocal,
    dutyEndCaptainLocal,
    latestDepartureLocal,
    latestDepartureCaptainLocal,
    dutyEndUtc,
    dutyEndCaptainUtc,
    latestDepartureUtc,
    latestDepartureCaptainUtc
  };
}

function renderResults(result) {
  const infoBox = document.getElementById("infoBox");

  if (result.error) {
    document.getElementById("maxFdp").textContent = "--:--";
    document.getElementById("maxFdpCaptain").textContent = "--:--";
    document.getElementById("fdpEndText").textContent = "Konec duty: --:-- LT / --:-- UTC";
    document.getElementById("fdpEndCaptainText").textContent = "Konec duty: --:-- LT / --:-- UTC";
    document.getElementById("latestDeparture").textContent = "--:-- LT";
    document.getElementById("latestDepartureUtc").textContent = "--:-- UTC";
    document.getElementById("latestDepartureCaptain").textContent = "--:-- LT";
    document.getElementById("latestDepartureCaptainUtc").textContent = "--:-- UTC";

    if (infoBox) {
      infoBox.className = "status bad";
      infoBox.textContent = result.error;
    }
    return;
  }

  document.getElementById("maxFdp").textContent = minutesToDuration(result.maxFdp);
  document.getElementById("maxFdpCaptain").textContent = minutesToDuration(result.maxFdpCaptain);

  document.getElementById("fdpEndText").textContent =
    `Konec duty: ${minutesToTime(result.dutyEndLocal)} LT / ${minutesToTime(result.dutyEndUtc)} UTC`;

  document.getElementById("fdpEndCaptainText").textContent =
    `Konec duty: ${minutesToTime(result.dutyEndCaptainLocal)} LT / ${minutesToTime(result.dutyEndCaptainUtc)} UTC`;

  document.getElementById("latestDeparture").textContent =
    `${minutesToTime(result.latestDepartureLocal)} LT`;

  document.getElementById("latestDepartureUtc").textContent =
    `${minutesToTime(result.latestDepartureUtc)} UTC`;

  document.getElementById("latestDepartureCaptain").textContent =
    `${minutesToTime(result.latestDepartureCaptainLocal)} LT`;

  document.getElementById("latestDepartureCaptainUtc").textContent =
    `${minutesToTime(result.latestDepartureCaptainUtc)} UTC`;

  let infoText = "";

  if (result.serviceType === "extended") {
    infoText =
      `Služba je počítaná z tabulky „e“. Oproti základní tabulce je plánované prodloužení ${minutesToDuration(result.plannedExtensionDifference)}. ` +
      `Kapitánské prodloužení přidává ještě ${minutesToDuration(result.captainExtraApplied)}.`;
  } else {
    infoText =
      `Služba je počítaná ze základní tabulky. Kapitánské prodloužení přidává ${minutesToDuration(result.captainExtraApplied)}.`;
  }

  if (result.hasDelayMessage) {
    if (!result.firstMessageValid) {
      infoText += ` 1. zpráva o zpoždění přišla jen ${minutesToDuration(result.firstMessageLead)} před původním reportingem, takže se nepoužila.`;
    } else {
      infoText += ` Původní reporting byl ${minutesToTime(result.originalReport)} LT.`;
      infoText += ` Doba zpoždění je ${minutesToDuration(result.delayDuration)}.`;
      infoText += ` Posunutý reporting je ${minutesToTime(result.delayedReport)} LT.`;
      infoText += ` FDP začíná v ${minutesToTime(result.effectiveReport)} LT.`;

      if (result.delayDuration < 240) {
        infoText += ` Zpoždění je menší než 4:00, proto se limit FDP počítá podle původního reportingu ${minutesToTime(result.originalReport)} LT.`;
      } else {
        infoText += ` Zpoždění je 4:00 nebo více, proto se použil více limitující čas pro výpočet FDP: ${minutesToTime(result.basisReportUsed)} LT.`;
      }

      if (result.usedSecondMessageRule && result.secondDelayMessageTime !== null) {
        infoText += ` Druhá zpráva přišla v ${minutesToTime(result.secondDelayMessageTime)} LT, takže začátek FDP byl určen jako dřívější z původního reportingu a 1:00 po druhé zprávě.`;
      }
    }
  }

  if (result.hasSby) {
    infoText += ` SBY začala v ${minutesToTime(result.sbyStart)} LT.`;
    infoText += ` Celková SBY byla ${minutesToDuration(result.sby)}.`;
    infoText += ` Pro krácení se počítá ${minutesToDuration(result.countableStandby)}.`;

    if (result.usePlanningCall && result.sbyCallTime !== null) {
      if (isNightMinute(result.sbyCallTime)) {
        infoText += ` Call time ${minutesToTime(result.sbyCallTime)} spadl do 23:00–07:00, takže od call time do reportingu se vše počítá jako denní držení.`;
      } else {
        infoText += ` Call time ${minutesToTime(result.sbyCallTime)} byl zadaný, ale neleží v 23:00–07:00, takže noční výjimka se nepoužila.`;
      }
    }

    if (result.standbyReduction > 0) {
      infoText += ` SBY zkrátila duty o ${minutesToDuration(result.standbyReduction)}.`;
    } else {
      infoText += ` SBY duty nezkrátila.`;
    }
  } else {
    infoText += ` Před reportingem nebylo SBY.`;
  }

  infoText += ` Přepočet do UTC je udělaný s offsetem ${formatUtcOffset(result.utcOffset)}.`;

  if (infoBox) {
    infoBox.className = "status good";
    infoBox.textContent = infoText;
  }
}

function runCalculation() {
  const result = calculateResults();
  renderResults(result);
}

document.getElementById("calculateBtn")?.addEventListener("click", runCalculation);
runCalculation();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
