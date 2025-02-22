import { handleSubmit } from "../formHandler";

// محاكاة الـ fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ message: "Mocked Analysis Result" }),
    })
);

test("يجب أن يرسل الطلب ويعرض النتيجة عند إدخال رابط صحيح", async () => {
    // إعداد DOM افتراضي
    document.body.innerHTML = `
        <div id="results"></div>
    `;

    // محاكاة حدث الإرسال
    const event = { preventDefault: jest.fn() };

    await handleSubmit(event, "https://example.com");

    // التحقق من أن fetch تم استدعاؤه مرة واحدة
    expect(fetch).toHaveBeenCalledTimes(1);

    // التحقق من عرض النتيجة في الـ DOM
    expect(document.getElementById("results").innerText).toBe(
        'Analysis Result: {"message":"Mocked Analysis Result"}'
    );
});

test("يجب أن يظهر تنبيه إذا لم يتم إدخال رابط", async () => {
    // محاكاة alert
    global.alert = jest.fn();

    // إعداد DOM افتراضي بدون إدخال رابط
    document.body.innerHTML = `
        <input id="urlInput" value="" />
        <div id="results"></div>
    `;

    const event = { preventDefault: jest.fn() };

    await handleSubmit(event);

    // التأكد من أن `alert` تم استدعاؤه
    expect(global.alert).toHaveBeenCalledWith("Please enter a URL!");
});
