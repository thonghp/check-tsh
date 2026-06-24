import { getContentMainNumber } from "./contentMainNumber.js";
import { getContentOccurrenceNumber, missingNumbers } from "./contentNumber.js";
import { completedArrows, emptyArrows } from "./contentArrows.js";
import { isolatedNumbers } from "./contentIsolated.js";

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

  // Chuyển màn hình giao diện
  document.getElementById("screen-input").classList.add("hidden");
  document.getElementById("screen-display").classList.remove("hidden");
});

// Xử lý sự kiện khi nhấn nút "Trở lại"
document.getElementById("btn-back").addEventListener("click", function () {
  document.getElementById("screen-display").classList.add("hidden");
  document.getElementById("screen-input").classList.remove("hidden");
});
