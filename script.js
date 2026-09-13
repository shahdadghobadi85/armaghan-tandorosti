// ===== Supabase Setup =====
const SUPABASE_URL = "https://bdnjhccfeftxctwcjxfe.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_fXiexAwGtymq1p8r9xIeyA_RRqe9lbj";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
});

// بستن منو با کلیک روی هر لینک
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("active");
  });
});

// ===== Booking Form Submission =====
const bookingForm = document.getElementById("bookingForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const reason = document.getElementById("reason").value.trim();

  if (!fullName || !phone || !date || !time) {
    showMessage("لطفاً همه فیلدهای ضروری را پر کنید.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "در حال ثبت...";

  const { error } = await supabaseClient.from("appointments").insert([
    {
      full_name: fullName,
      phone: phone,
      appointment_date: date,
      appointment_time: time,
      reason: reason || null,
    },
  ]);

  submitBtn.disabled = false;
  submitBtn.textContent = "ثبت نوبت";

   if (error) {
    console.error(error);
    showMessage("خطا: " + error.message, "error");
  } else {
    showMessage("نوبت شما با موفقیت ثبت شد! به‌زودی با شما تماس می‌گیریم.", "success");
    bookingForm.reset();
  }
});

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = "form-message " + type;
}