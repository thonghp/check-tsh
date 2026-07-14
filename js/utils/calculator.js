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

function getZodiacSign(day, month) {
  if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) return "Bạch Dương";
  if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) return "Kim Ngưu";
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Song Tử";
  if ((month == 6 && day >= 21) || (month == 7 && day <= 21)) return "Cự Giải";
  if ((month == 7 && day >= 22) || (month == 8 && day <= 22)) return "Sư Tử";
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Xử Nữ";
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Thiên Bình";
  if ((month == 10 && day >= 23) || (month == 11 && day <= 22)) return "Bọ Cạp";
  if ((month == 11 && day >= 23) || (month == 12 && day <= 22)) return "Nhân Mã";
  if ((month == 12 && day >= 23) || (month == 1 && day <= 21)) return "Ma Kết";
  if ((month == 1 && day >= 22) || (month == 2 && day <= 20)) return "Bảo Bình";
  if ((month == 2 && day >= 21) || (month == 3 && day <= 20)) return "Song Ngư";
  return "";
}

export { removeVietnameseTones, calculateSum, mainNumber, countDigits, countNameDigits, reduceToSingleDigit, analyzeName, getZodiacSign };