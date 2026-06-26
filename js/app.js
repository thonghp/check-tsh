import { getContentMainNumber } from "./contentMainNumber.js";
import { getContentOccurrenceNumber, missingNumbers } from "./contentNumber.js";
import { completedArrows, emptyArrows } from "./contentArrows.js";
import { isolatedNumbers } from "./contentIsolated.js";
import { personalYearContent } from "./contentYear.js";
import { peakNumbersContent } from "./contentPeak.js";
import { soulContent, expressContent } from "./contentName.js";

const nameInput = document.getElementById("name");
const dateInput = document.getElementById("birthDate");

// BẢNG QUY ĐỔI CHỮ CÁI SANG SỐ THEO HỆ PYTHAGORAS CỦA BẠN
const pythagoreanMap = {
  A: 1,
  J: 1,
  S: 1,
  B: 2,
  K: 2,
  T: 2,
  C: 3,
  L: 3,
  U: 3,
  D: 4,
  M: 4,
  V: 4,
  E: 5,
  N: 5,
  W: 5,
  F: 6,
  O: 6,
  X: 6,
  G: 7,
  P: 7,
  Y: 7,
  H: 8,
  Q: 8,
  Z: 8,
  I: 9,
  R: 9,
};

// Hàm loại bỏ dấu tiếng Việt chuẩn xác để chuyển đổi chữ cái lạt-tinh chuẩn
function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Hàm tính tổng các chữ số
function calculateSum(dateString) {
  const digits = dateString.replace(/\D/g, "");
  let sum = 0;
  for (let char of digits) {
    sum += parseInt(char);
  }
  return sum;
}

// Tính số chủ đạo theo quy tắc Thần số học
function mainNumber(num) {
  if (num === 11 || num === 22 || num === 10) {
    return num;
  }
  while (num > 11) {
    num = num
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);

    if (num === 11 || num === 22 || num === 10) {
      return num;
    }
  }
  return num;
}

// Hàm đếm số lần xuất hiện của từng chữ số
function countDigits(dateString) {
  const digits = dateString.replace(/\D/g, "");
  const countMap = {};
  for (let char of digits) {
    if (countMap[char]) {
      countMap[char] += 1;
    } else {
      countMap[char] = 1;
    }
  }
  return countMap;
}

// THÊM MỚI: Hàm đếm các con số được chuyển đổi từ Tên gọi
function countNameDigits(nameString) {
  const cleanName = removeVietnameseTones(nameString).toUpperCase();
  const countMap = {};
  for (let char of cleanName) {
    const numStr = pythagoreanMap[char];
    if (numStr) {
      if (countMap[numStr]) {
        countMap[numStr] += 1;
      } else {
        countMap[numStr] = 1;
      }
    }
  }
  return countMap;
}

// Hàm rút gọn con số về dải từ 1 đến 9 theo quy tắc tính năm
function reduceToSingleDigit(num) {
  while (num > 9) {
    num = num
      .toString()
      .split("")
      .reduce((acc, d) => acc + parseInt(d), 0);
  }
  return num;
}

// Hàm sinh biểu đồ sóng chu kỳ và highlight năm cá nhân hiện tại màu đỏ
function drawWaveChart(activeYear) {
  const container = document.getElementById("wave-chart-container");

  // Tọa độ các điểm nút (X, Y) trên đồ thị khớp chính xác hình dáng lượn sóng của bạn
  const points = [
    { year: 9, x: 35, y: 40, pos: "left", label: "9" },
    { year: 1, x: 95, y: 55, pos: "top", label: "1" },
    { year: 2, x: 145, y: 90, pos: "right", label: "2" },
    { year: 3, x: 195, y: 130, pos: "left", label: "3" },
    { year: 4, x: 245, y: 160, pos: "bottom", label: "4" }, // Điểm trũng 4
    { year: 5, x: 305, y: 135, pos: "right", label: "5" },
    { year: 6, x: 365, y: 105, pos: "top", label: "6" }, // Đỉnh phụ 6
    { year: 7, x: 425, y: 160, pos: "bottom", label: "7" }, // Điểm trũng 7
    { year: 8, x: 485, y: 85, pos: "right", label: "8" },
    { year: 9, x: 550, y: 35, pos: "top", label: "9" }, // Đỉnh cao 9
  ];

  let svgHtml = `
    <svg viewBox="0 0 580 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background: #f8fafc; border-radius: 8px; padding: 10px;">
      <path d="M 35 40 C 75 40, 75 40, 95 55 C 135 75, 165 105, 195 130 C 215 150, 225 160, 245 160 C 265 160, 285 150, 305 135 C 335 110, 345 105, 365 105 C 385 105, 405 120, 425 160 C 445 200, 465 130, 485 85 C 515 35, 535 35, 550 35" 
            fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
  `;

  // Duyệt qua danh sách điểm để vẽ text và chấm tròn
  points.forEach((p, index) => {
    // Nếu trùng năm cá nhân (ưu tiên highlight nút cuối nếu rơi vào năm 9)
    const isActive =
      p.year === activeYear && (activeYear !== 9 || index === 9 || index === 0);
    const nodeColor = isActive ? "#ef4444" : "#000000";
    const nodeRadius = isActive ? "7" : "5";
    const textWeight = isActive ? "bold" : "normal";
    const textSize = isActive ? "16px" : "13px";

    // Tính toán độ lệch vị trí nhãn chữ để không đè lên đường sóng
    let tx = p.x;
    let ty = p.y;
    if (p.pos === "top") ty -= 14;
    if (p.pos === "bottom") ty += 20;
    if (p.pos === "left") {
      tx -= 14;
      ty += 5;
    }
    if (p.pos === "right") {
      tx += 14;
      ty += 5;
    }

    svgHtml += `
      <circle cx="${p.x}" cy="${p.y}" r="${nodeRadius}" fill="${nodeColor}" />
      <text x="${tx}" y="${ty}" fill="${nodeColor}" font-size="${textSize}" font-weight="${textWeight}" text-anchor="middle">${p.label}</text>
    `;
  });

  svgHtml += `</svg>`;
  container.innerHTML = svgHtml;
}

// Hàm rút gọn về dải 1 đến 9 (Dùng cho Tầng đáy và Tầng 1)
function reduceTo9(num) {
  while (num > 9) {
    num = num
      .toString()
      .split("")
      .reduce((acc, d) => acc + parseInt(d), 0);
  }
  return num;
}

// Hàm rút gọn có giữ lại số 10 và 11 (Dùng cho Tầng 2 và Tầng 3)
function reduceTo11(num) {
  while (num > 11) {
    num = num
      .toString()
      .split("")
      .reduce((acc, d) => acc + parseInt(d), 0);
  }
  return num;
}

// Hàm tính toán và vẽ SVG Kim Tự Tháp 4 Đỉnh Cao kết hợp luận giải ý nghĩa
function drawPyramidChart(birthDateStr, mainNum) {
  const container = document.getElementById("pyramid-chart-container");

  // 1. TÁCH DỮ LIỆU NGÀY SINH (Định dạng đầu vào YYYY-MM-DD)
  const parts = birthDateStr.split("-");
  const birthYear = parseInt(parts[0]);
  const birthMonth = parseInt(parts[1]);
  const birthDay = parseInt(parts[2]);

  // 2. TÍNH TOÁN GIÁ TRỊ CÁC NÚT (Theo công thức chuẩn)
  // Tầng đáy: Rút gọn về 1 <= x <= 9
  const A = reduceTo9(birthMonth); // Trái (Tháng)
  const B = reduceTo9(birthDay); // Giữa (Ngày)
  const C = reduceTo9(birthYear); // Phải (Năm)

  // Tầng 1: Tính 2 đỉnh đầu (<= 9)
  const vPeak1 = reduceTo9(A + B);
  const vPeak2 = reduceTo9(B + C);

  // Tầng 2: Tính đỉnh 3 (<= 11)
  const vPeak3 = reduceTo11(vPeak1 + vPeak2);

  // Tầng 3: Tính đỉnh 4 cao nhất (<= 11)
  const vPeak4 = reduceTo11(A + C);

  // 3. TÍNH TOÁN ĐỘ TUỔI VÀ NĂM ĐẠT ĐỈNH
  const age1 = 36 - mainNum;
  const age2 = age1 + 9;
  const age3 = age2 + 9;
  const age4 = age3 + 9;

  const year1 = birthYear + age1;
  const year2 = birthYear + age2;
  const year3 = birthYear + age3;
  const year4 = birthYear + age4;

  // 4. XÂY DỰNG MÃ SVG VẼ KIM TỰ THÁP
  const coords = {
    m: { x: 100, y: 320 },
    d: { x: 300, y: 320 },
    y: { x: 500, y: 320 },
    p1: { x: 200, y: 220 },
    p2: { x: 400, y: 220 },
    p3: { x: 300, y: 120 },
    p4: { x: 300, y: 30 },
  };

  const svgHtml = `
    <svg viewBox="0 0 600 380" width="100%" height="100%" style="max-width: 600px; font-family: sans-serif; display: block; margin: 0 auto;" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#1e293b" stroke-width="2">
        <line x1="${coords.m.x}" y1="${coords.m.y}" x2="${coords.p1.x}" y2="${coords.p1.y}" />
        <line x1="${coords.d.x}" y1="${coords.d.y}" x2="${coords.p1.x}" y2="${coords.p1.y}" />
        <line x1="${coords.d.x}" y1="${coords.d.y}" x2="${coords.p2.x}" y2="${coords.p2.y}" />
        <line x1="${coords.y.x}" y1="${coords.y.y}" x2="${coords.p2.x}" y2="${coords.p2.y}" />
        <line x1="${coords.p1.x}" y1="${coords.p1.y}" x2="${coords.p3.x}" y2="${coords.p3.y}" />
        <line x1="${coords.p2.x}" y1="${coords.p2.y}" x2="${coords.p3.x}" y2="${coords.p3.y}" />
        <line x1="${coords.m.x}" y1="${coords.m.y}" x2="${coords.p4.x}" y2="${coords.p4.y}" />
        <line x1="${coords.y.x}" y1="${coords.y.y}" x2="${coords.p4.x}" y2="${coords.p4.y}" />
      </g>

      <g text-anchor="middle" font-weight="bold" font-size="16px">
        <circle cx="${coords.m.x}" cy="${coords.m.y}" r="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
        <text x="${coords.m.x}" y="${coords.m.y + 6}" fill="#1e3a8a">${A}</text>
        
        <circle cx="${coords.d.x}" cy="${coords.d.y}" r="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
        <text x="${coords.d.x}" y="${coords.d.y + 6}" fill="#1e3a8a">${B}</text>
        
        <circle cx="${coords.y.x}" cy="${coords.y.y}" r="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
        <text x="${coords.y.x}" y="${coords.y.y + 6}" fill="#1e3a8a">${C}</text>

        <circle cx="${coords.p1.x}" cy="${coords.p1.y}" r="22" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
        <text x="${coords.p1.x}" y="${coords.p1.y + 6}" fill="#4c1d95">${vPeak1}</text>

        <circle cx="${coords.p2.x}" cy="${coords.p2.y}" r="22" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
        <text x="${coords.p2.x}" y="${coords.p2.y + 6}" fill="#4c1d95">${vPeak2}</text>

        <circle cx="${coords.p3.x}" cy="${coords.p3.y}" r="22" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
        <text x="${coords.p3.x}" y="${coords.p3.y + 6}" fill="#4c1d95">${vPeak3}</text>

        <circle cx="${coords.p4.x}" cy="${coords.p4.y}" r="22" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
        <text x="${coords.p4.x}" y="${coords.p4.y + 6}" fill="#4c1d95">${vPeak4}</text>
      </g>

      <g fill="#475569" font-size="13px" text-anchor="middle">
        <text x="${coords.m.x}" y="${coords.m.y + 45}">Tháng sinh</text>
        <text x="${coords.d.x}" y="${coords.d.y + 45}">Ngày sinh</text>
        <text x="${coords.y.x}" y="${coords.y.y + 45}">Năm sinh</text>

        <text x="${coords.p1.x}" y="${coords.p1.y + 45}" font-weight="bold">${age1} tuổi</text>
        <text x="${coords.p1.x}" y="${coords.p1.y + 60}">(${year1})</text>

        <text x="${coords.p2.x}" y="${coords.p2.y + 45}" font-weight="bold">${age2} tuổi</text>
        <text x="${coords.p2.x}" y="${coords.p2.y + 60}">(${year2})</text>

        <text x="${coords.p3.x}" y="${coords.p3.y + 45}" font-weight="bold">${age3} tuổi</text>
        <text x="${coords.p3.x}" y="${coords.p3.y + 60}">(${year3})</text>

        <text x="${coords.p4.x + 35}" y="${coords.p4.y}" text-anchor="start" font-weight="bold">${age4} tuổi</text>
        <text x="${coords.p4.x + 35}" y="${coords.p4.y + 15}" text-anchor="start">(${year4})</text>
        
        <text x="${coords.p1.x - 30}" y="${coords.p1.y - 15}" fill="#ef4444" font-weight="bold" font-size="12px">Đỉnh 1</text>
        <text x="${coords.p2.x + 30}" y="${coords.p2.y - 15}" fill="#ef4444" font-weight="bold" font-size="12px">Đỉnh 2</text>
        <text x="${coords.p3.x + 40}" y="${coords.p3.y - 10}" fill="#ef4444" font-weight="bold" font-size="12px">Đỉnh 3</text>
        <text x="${coords.p4.x - 40}" y="${coords.p4.y}" fill="#ef4444" font-weight="bold" font-size="12px">Đỉnh 4</text>
      </g>
    </svg>
  `;

  // 5. LẤY NỘI DUNG LUẬN GIẢI CHO TỪNG ĐỈNH DỰA TRÊN KẾT QUẢ SỐ TÍNH ĐƯỢC
  const descPeak1 = peakNumbersContent[vPeak1] || "Chưa có dữ liệu giải mã.";
  const descPeak2 = peakNumbersContent[vPeak2] || "Chưa có dữ liệu giải mã.";
  const descPeak3 = peakNumbersContent[vPeak3] || "Chưa có dữ liệu giải mã.";
  const descPeak4 = peakNumbersContent[vPeak4] || "Chưa có dữ liệu giải mã.";

  // 6. TẠO KHỐI BẢNG TÓM TẮT VÀ NỘI DUNG LUẬN GIẢI CHI TIẾT
  const summaryHtml = `
    <div style="margin-top: 30px; width: 100%; text-align: left;">
      <div style="padding: 20px; background-color: #f1f5f9; border-radius: 8px; border-left: 5px solid #3b82f6; margin-bottom: 25px;">
        <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 700;">📌 Tuổi đạt đỉnh</h4>
        <ul style="margin: 0; padding-left: 20px; color: #334155; line-height: 1.8; font-size: 15px;">
          <li><strong>Đạt đỉnh 1</strong> = 36 - ${mainNum} (Số chủ đạo) = <strong>${age1} tuổi</strong> <em>(Năm ${year1})</em></li>
          <li><strong>Đạt đỉnh 2</strong> = Đỉnh 1 (${age1}) + 9 = <strong>${age2} tuổi</strong> <em>(Năm ${year2})</em></li>
          <li><strong>Đạt đỉnh 3</strong> = Đỉnh 2 (${age2}) + 9 = <strong>${age3} tuổi</strong> <em>(Năm ${year3})</em></li>
          <li><strong>Đạt đỉnh 4</strong> = Đỉnh 3 (${age3}) + 9 = <strong>${age4} tuổi</strong> <em>(Năm ${year4})</em></li>
        </ul>
      </div>

      <div style="padding: 20px; background-color: #fdf2f8; border-radius: 8px; border-left: 5px solid #db2777;">
        <h4 style="margin: 0 0 15px 0; color: #831843; font-size: 16px; font-weight: 700;">🔮 Ý nghĩa các con số trong đỉnh cao của bạn</h4>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div style="border-bottom: 1px dashed #fbcfe8; padding-bottom: 10px;">
            <span style="display: inline-block; background: #db2777; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">ĐỈNH 1: Số ${vPeak1}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #4d0620; line-height: 1.6;"><strong>Năm ${age1} tuổi (${year1}):</strong> ${descPeak1}</p>
          </div>

          <div style="border-bottom: 1px dashed #fbcfe8; padding-bottom: 10px;">
            <span style="display: inline-block; background: #db2777; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">ĐỈNH 2: Số ${vPeak2}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #4d0620; line-height: 1.6;"><strong>Năm ${age2} tuổi (${year2}):</strong> ${descPeak2}</p>
          </div>

          <div style="border-bottom: 1px dashed #fbcfe8; padding-bottom: 10px;">
            <span style="display: inline-block; background: #db2777; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">ĐỈNH 3: Số ${vPeak3}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #4d0620; line-height: 1.6;"><strong>Năm ${age3} tuổi (${year3}):</strong> ${descPeak3}</p>
          </div>

          <div style="padding-bottom: 5px;">
            <span style="display: inline-block; background: #db2777; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">ĐỈNH 4: Số ${vPeak4}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #4d0620; line-height: 1.6;"><strong>Năm ${age4} tuổi (${year4}):</strong> ${descPeak4}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Gắn toàn bộ cấu trúc SVG và phần nội dung text vào container chính
  container.innerHTML =
    `<div style="display: flex; flex-direction: column; align-items: center; width: 100%;">` +
    svgHtml +
    summaryHtml +
    `</div>`;
}

// Hàm rút gọn theo quy tắc: 1 <= x <= 11 và số đặc biệt 22
function reduceNameNumber(num) {
  if (num === 22) return 22;
  while (num > 11 && num !== 22) {
    num = num.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return num;
}

// Hàm phân tích tên gọi (Đã fix lỗi Case Sensitivity)
function analyzeName(fullName) {
  // ÉP TOÀN BỘ VỀ IN HOA ĐỂ KHỚP VỚI BẢNG MAP VÀ MẢNG NGUYÊN ÂM
  const cleanName = removeVietnameseTones(fullName).toUpperCase();
  const words = cleanName.trim().split(/\s+/);

  let soulSum = 0;    // Tổng nguyên âm
  let expressSum = 0; // Tổng phụ âm

  words.forEach(word => {
    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!pythagoreanMap[char]) continue; // Bỏ qua ký tự lạ (khoảng trắng, số...)

      const val = pythagoreanMap[char];
      let isVowel = false;

      // Đã đổi sang mảng nguyên âm IN HOA
      if (['U', 'E', 'O', 'A', 'I'].includes(char)) {
        isVowel = true;
      }
      // Chữ Y IN HOA cũng phải check
      else if (char === 'Y' && i === word.length - 1) {
        isVowel = true;
      }

      if (isVowel) {
        soulSum += val;
      } else {
        expressSum += val;
      }
    }
  });

  const soulNumber = reduceNameNumber(soulSum);
  const expressNumber = reduceNameNumber(expressSum);
  const nameNumber = reduceNameNumber(soulNumber + expressNumber);

  return { soulNumber, expressNumber, nameNumber };
}

// Hàm render UI xuất kết quả ra màn hình
function renderNameAnalysis(fullName) {
  const indices = analyzeName(fullName);
  const soulText = soulContent[indices.soulNumber] || "Chưa có dữ liệu giải mã.";
  const expressText = expressContent[indices.expressNumber] || "Chưa có dữ liệu giải mã.";
  const nameContainer = document.getElementById("name-analysis-container");

  // Nếu không tìm thấy container thì thoát hàm để tránh lỗi
  if (!nameContainer) return;

  nameContainer.innerHTML = `
    <div style="margin-top: 30px; width: 100%; text-align: left;">
      <div style="padding: 20px; background-color: #f0fdf4; border-radius: 8px; border-left: 5px solid #22c55e;">
        <h4 style="margin: 0 0 15px 0; color: #14532d; font-size: 16px; font-weight: 700;">👤 Phân Tích Chỉ Số Tên Gọi: ${fullName.toUpperCase()}</h4>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div style="border-bottom: 1px dashed #bbf7d0; padding-bottom: 10px;">
             <span style="display: inline-block; background: #22c55e; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">CHỈ SỐ TÊN: ${indices.nameNumber}</span>
             <p style="margin: 5px 0 0 0; font-size: 14px; color: #064e3b; font-style: italic;">(Tổng hòa giữa Tâm hồn [${indices.soulNumber}] và Thể hiện [${indices.expressNumber}])</p>
          </div>

          <div style="border-bottom: 1px dashed #bbf7d0; padding-bottom: 10px;">
            <span style="display: inline-block; background: #0ea5e9; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">CHỈ SỐ TÂM HỒN: ${indices.soulNumber}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #0c4a6e; line-height: 1.6;"><strong>Ý nghĩa:</strong> ${soulText}</p>
          </div>

          <div>
            <span style="display: inline-block; background: #f59e0b; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">CHỈ SỐ THỂ HIỆN: ${indices.expressNumber}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #78350f; line-height: 1.6;"><strong>Ý nghĩa:</strong> ${expressText}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Xử lý sự kiện khi nhấn nút "Tiếp tục"
document.getElementById("btn-next").addEventListener("click", function () {
  const name = nameInput.value.trim();
  const birthDate = dateInput.value;

  if (name === "" || birthDate === "") {
    alert("Vui lòng điền đầy đủ thông tin vào các ô trống!");
    return;
  }

  const totalSum = calculateSum(birthDate);
  const mainNum = mainNumber(totalSum);

  // Định dạng hiển thị ngày từ YYYY-MM-DD sang DD/MM/YYYY
  const dateParts = birthDate.split("-");
  const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  // Đổ dữ liệu cơ bản ra giao diện
  document.getElementById("res-name").textContent = name;
  document.getElementById("res-dob").textContent = formattedDate;
  document.getElementById("res-sum").textContent = mainNum;

  // Đổ dữ liệu chi tiết của số chủ đạo
  const mainNumData = getContentMainNumber(mainNum);
  document.getElementById("tu-khoa").textContent =
    mainNumData?.["tu-khoa"] || "Chưa có dữ liệu";
  document.getElementById("nang-luc").textContent =
    mainNumData?.["nang-luc"] || "Chưa có dữ liệu";
  document.getElementById("thach-thuc").textContent =
    mainNumData?.["thach-thuc"] || "Chưa có dữ liệu";
  document.getElementById("bai-hoc").textContent =
    mainNumData?.["bai-hoc"] || "Chưa có dữ liệu";

  // Xử lý đổ dữ liệu luận giải số lần xuất hiện và số bị thiếu
  const digitCounts = countDigits(birthDate);
  const interpretationDiv = document.getElementById(
    "occurrence-interpretation",
  );
  interpretationDiv.innerHTML = "";

  // Quét từ 1 đến 9 để lấy CẢ SỐ CÓ MẶT VÀ SỐ BỊ THIẾU
  for (let i = 1; i <= 9; i++) {
    const times = digitCounts[i] || 0; // Lấy số lần xuất hiện, nếu không có là 0
    const p = document.createElement("p");

    if (times > 0) {
      // TRƯỜNG HỢP 1: CÓ XUẤT HIỆN
      const numberGroup = getContentOccurrenceNumber(i);
      if (numberGroup) {
        let textDetail = numberGroup[times];

        // Xử lý dự phòng nếu số lần xuất hiện nhiều hơn dữ liệu bạn có (Vd: xuất hiện 5 lần nhưng data chỉ có đến 3)
        if (!textDetail) {
          // Lấy nội dung của số lần xuất hiện cao nhất mà bạn đã khai báo
          const maxTimesMap = Object.keys(numberGroup).reduce((a, b) =>
            Math.max(a, b),
          );
          textDetail =
            numberGroup[maxTimesMap] +
            ` (Năng lượng cực kỳ mạnh do xuất hiện đến ${times} lần)`;
        }

        p.innerHTML = `<strong>Số ${i} (${times} lần):</strong> ${textDetail}`;
        interpretationDiv.appendChild(p);
      }
    } else {
      // TRƯỜNG HỢP 2: SỐ BỊ THIẾU (times = 0)
      p.className = "missing-number"; // Gán class vàng hổ phách để khác biệt
      p.innerHTML = `<strong>${missingNumbers[i]}</strong>`;
      interpretationDiv.appendChild(p);
    }
  }

  // --- 1. ĐIỀN SỐ VÀO BIỂU ĐỒ 1: BIỂU ĐỒ NGÀY SINH ---
  for (let i = 1; i <= 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    // Nếu số xuất hiện n lần, lặp lại nó n lần (VD: "1" xuất hiện 2 lần -> "11")
    if (digitCounts[i]) {
      cell.textContent = String(i).repeat(digitCounts[i]);
    } else {
      cell.textContent = ""; // Để trống nếu không có số
    }
  }

  // --- THÊM MỚI: TÍNH TOÁN & ĐIỀN SỐ VÀO BIỂU ĐỒ 2 (NGÀY SINH + TÊN) ---
  const nameCounts = countNameDigits(name);
  for (let i = 1; i <= 9; i++) {
    const combCell = document.getElementById(`comb-cell-${i}`);
    const dateOccur = digitCounts[i] || 0;
    const nameOccur = nameCounts[i] || 0;
    const totalOccur = dateOccur + nameOccur;

    if (totalOccur > 0) {
      combCell.textContent = String(i).repeat(totalOccur);
    } else {
      combCell.textContent = "";
    }
  }

  // --- 2. THUẬT TOÁN QUÉT MŨI TÊN ---
  const arrowLines = ["147", "258", "369", "123", "456", "789", "159", "357"];
  const arrowsDiv = document.getElementById("arrows-interpretation");
  arrowsDiv.innerHTML = ""; // Xóa dữ liệu mũi tên cũ

  let hasAnyArrow = false;

  arrowLines.forEach((line) => {
    // Cắt chuỗi "147" thành mảng ['1', '4', '7']
    const [a, b, c] = line.split("");

    // Kiểm tra xem 3 con số trên đường này có xuất hiện hay không
    const hasA = digitCounts[a] > 0;
    const hasB = digitCounts[b] > 0;
    const hasC = digitCounts[c] > 0;

    const p = document.createElement("p");

    // Nếu CẢ 3 SỐ đều CÓ -> Mũi tên đầy đủ
    if (hasA && hasB && hasC) {
      p.innerHTML = `<strong>${completedArrows[line]}</strong>`;
      arrowsDiv.appendChild(p);
      hasAnyArrow = true;
    }
    // Nếu CẢ 3 SỐ đều TRỐNG -> Mũi tên khuyết
    else if (!hasA && !hasB && !hasC) {
      p.className = "empty-arrow"; // Áp class CSS đỏ nhạt
      p.innerHTML = `<strong>${emptyArrows[line]}</strong>`;
      arrowsDiv.appendChild(p);
      hasAnyArrow = true;
    }
  });

  if (!hasAnyArrow) {
    arrowsDiv.innerHTML =
      "<p style='background: #f8fafc; border-left: 3px solid #94a3b8;'>Không có Mũi tên cá tính nổi bật hoặc khuyết hoàn toàn trên biểu đồ này.</p>";
  }

  // --- 3. THUẬT TOÁN QUÉT SỐ BỊ CÔ LẬP (ỐC ĐẢO) ---
  const isolatedDiv = document.getElementById("isolated-interpretation");
  isolatedDiv.innerHTML = ""; // Xóa dữ liệu cũ
  let hasIsolated = false;

  // Lặp qua từng trường hợp số cô lập đã định nghĩa
  for (let num in isolatedNumbers) {
    const data = isolatedNumbers[num];
    const targetNumber = parseInt(num);

    // ĐIỀU KIỆN 1: Số đó PHẢI XUẤT HIỆN trong biểu đồ
    if (digitCounts[targetNumber] > 0) {
      // ĐIỀU KIỆN 2: Tất cả các ô xung quanh (trong mảng emptyReq) PHẢI TRỐNG
      let isIsolated = true;
      for (let emptyCell of data.emptyReq) {
        if (digitCounts[emptyCell] > 0) {
          isIsolated = false; // Phát hiện có số ở ô kề bên -> Không bị cô lập
          break;
        }
      }

      // Nếu thỏa mãn cả 2 điều kiện -> In ra màn hình
      if (isIsolated) {
        const p = document.createElement("p");
        p.innerHTML = `<strong>Số ${targetNumber} cô lập (Trống ${data.emptyReq.join("")}):</strong> ${data.content}`;
        isolatedDiv.appendChild(p);
        hasIsolated = true;
      }
    }
  }

  // Nếu biểu đồ liên kết tốt, không có ốc đảo nào
  if (!hasIsolated) {
    const p = document.createElement("p");
    p.className = "no-isolated";
    p.innerHTML =
      "Không có con số nào bị cô lập. Các nguồn năng lượng trên biểu đồ của bạn đều có sự liên kết và hỗ trợ lẫn nhau.";
    isolatedDiv.appendChild(p);
  }

  // --- 4. THUẬT TOÁN TÍNH NĂM THẾ GIỚI & NĂM CÁ NHÂN ---
  const currentYear = 2026; // Đồng bộ thời gian hệ thống thực tế năm 2026
  const worldYear = reduceToSingleDigit(currentYear); // 2 + 0 + 2 + 6 = 10 -> 1

  // Bóc tách ngày tháng sinh từ mảng dữ liệu dateParts đã được xử lý phía trên (định dạng YYYY-MM-DD)
  const birthDay = parseInt(dateParts[2]);
  const birthMonth = parseInt(dateParts[1]);

  // Công thức: Năm cá nhân = Năm thế giới + Tháng sinh + Ngày sinh
  const personalYear = reduceToSingleDigit(worldYear + birthMonth + birthDay);

  // Hiển thị chỉ số ra màn hình
  document.getElementById("res-world-year").textContent =
    `${worldYear} (Từ năm gốc ${currentYear})`;
  document.getElementById("res-personal-year").textContent = personalYear;

  // Đổ nội dung luận giải tương ứng
  document.getElementById("personal-year-text").innerHTML =
    personalYearContent[personalYear];

  // Thay đổi màu sắc hộp nội dung linh hoạt nếu rơi vào năm trũng (4, 7) để cảnh báo người dùng trực quan
  const infoBox = document.getElementById("personal-year-box");
  if (personalYear === 4 || personalYear === 7) {
    infoBox.style.backgroundColor = "#fff7ed"; // Nền cam nhạt báo hiệu điểm trũng
    infoBox.style.borderLeftColor = "#f97316"; // Viền cam đậm
  } else {
    infoBox.style.backgroundColor = "#fef2f2"; // Nền đỏ nhạt tiêu chuẩn chu kỳ
    infoBox.style.borderLeftColor = "#ef4444"; // Viền đỏ tiêu chuẩn
  }

  // Gọi hàm vẽ đồ thị hình sóng sin sắc nét lên giao diện
  drawWaveChart(personalYear);

  // --- 5. TÍNH TOÁN VÀ VẼ KIM TỰ THÁP 4 ĐỈNH CAO ---
  // Truyền ngày sinh nguyên bản và số chủ đạo đã tính vào hàm
  drawPyramidChart(birthDate, mainNum);

  renderNameAnalysis(name);

  // Chuyển màn hình giao diện
  document.getElementById("screen-input").classList.add("hidden");
  document.getElementById("screen-display").classList.remove("hidden");
});

// Xử lý sự kiện khi nhấn nút "Trở lại"
document.getElementById("btn-back").addEventListener("click", function () {
  document.getElementById("screen-display").classList.add("hidden");
  document.getElementById("screen-input").classList.remove("hidden");
});
