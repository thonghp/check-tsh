import { getContentMainNumber } from "./contentMainNumber.js";
import { getContentOccurrenceNumber, missingNumbers } from "./contentNumber.js";
import { completedArrows, emptyArrows } from "./contentArrows.js";
import { isolatedNumbers } from "./contentIsolated.js";
import { personalYearContent } from "./contentYear.js";

const nameInput = document.getElementById("name");
const dateInput = document.getElementById("birthDate");

// BẢNG QUY ĐỔI CHỮ CÁI SANG SỐ THEO HỆ PYTHAGORAS CỦA BẠN
const alphabetMapping = {
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
    const numStr = alphabetMapping[char];
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
    num = num.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return num;
}

// Hàm sinh biểu đồ sóng chu kỳ và highlight năm cá nhân hiện tại màu đỏ
function drawWaveChart(activeYear) {
  const container = document.getElementById("wave-chart-container");

  // Tọa độ các điểm nút (X, Y) trên đồ thị khớp chính xác hình dáng lượn sóng của bạn
  const points = [
    { year: 9, x: 35, y: 40, pos: 'left', label: '9' },
    { year: 1, x: 95, y: 55, pos: 'top', label: '1' },
    { year: 2, x: 145, y: 90, pos: 'right', label: '2' },
    { year: 3, x: 195, y: 130, pos: 'left', label: '3' },
    { year: 4, x: 245, y: 160, pos: 'bottom', label: '4' }, // Điểm trũng 4
    { year: 5, x: 305, y: 135, pos: 'right', label: '5' },
    { year: 6, x: 365, y: 105, pos: 'top', label: '6' }, // Đỉnh phụ 6
    { year: 7, x: 425, y: 160, pos: 'bottom', label: '7' }, // Điểm trũng 7
    { year: 8, x: 485, y: 85, pos: 'right', label: '8' },
    { year: 9, x: 550, y: 35, pos: 'top', label: '9' }  // Đỉnh cao 9
  ];

  let svgHtml = `
    <svg viewBox="0 0 580 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background: #f8fafc; border-radius: 8px; padding: 10px;">
      <path d="M 35 40 C 75 40, 75 40, 95 55 C 135 75, 165 105, 195 130 C 215 150, 225 160, 245 160 C 265 160, 285 150, 305 135 C 335 110, 345 105, 365 105 C 385 105, 405 120, 425 160 C 445 200, 465 130, 485 85 C 515 35, 535 35, 550 35" 
            fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
  `;

  // Duyệt qua danh sách điểm để vẽ text và chấm tròn
  points.forEach((p, index) => {
    // Nếu trùng năm cá nhân (ưu tiên highlight nút cuối nếu rơi vào năm 9)
    const isActive = (p.year === activeYear && (activeYear !== 9 || index === 9 || index === 0));
    const nodeColor = isActive ? "#ef4444" : "#000000";
    const nodeRadius = isActive ? "7" : "5";
    const textWeight = isActive ? "bold" : "normal";
    const textSize = isActive ? "16px" : "13px";

    // Tính toán độ lệch vị trí nhãn chữ để không đè lên đường sóng
    let tx = p.x;
    let ty = p.y;
    if (p.pos === 'top') ty -= 14;
    if (p.pos === 'bottom') ty += 20;
    if (p.pos === 'left') { tx -= 14; ty += 5; }
    if (p.pos === 'right') { tx += 14; ty += 5; }

    svgHtml += `
      <circle cx="${p.x}" cy="${p.y}" r="${nodeRadius}" fill="${nodeColor}" />
      <text x="${tx}" y="${ty}" fill="${nodeColor}" font-size="${textSize}" font-weight="${textWeight}" text-anchor="middle">${p.label}</text>
    `;
  });

  svgHtml += `</svg>`;
  container.innerHTML = svgHtml;
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
  document.getElementById("res-world-year").textContent = `${worldYear} (Từ năm gốc ${currentYear})`;
  document.getElementById("res-personal-year").textContent = personalYear;

  // Đổ nội dung luận giải tương ứng
  document.getElementById("personal-year-text").innerHTML = personalYearContent[personalYear];

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

  // Chuyển màn hình giao diện
  document.getElementById("screen-input").classList.add("hidden");
  document.getElementById("screen-display").classList.remove("hidden");
});

// Xử lý sự kiện khi nhấn nút "Trở lại"
document.getElementById("btn-back").addEventListener("click", function () {
  document.getElementById("screen-display").classList.add("hidden");
  document.getElementById("screen-input").classList.remove("hidden");
});
