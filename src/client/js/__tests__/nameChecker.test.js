import { checkForName } from "../nameChecker";

global.alert = jest.fn(); // محاكاة دالة alert

test("يجب أن يعرض 'Welcome, Captain!' إذا تم إدخال اسم كابتن صحيح", () => {
    checkForName("Kirk");
    expect(global.alert).toHaveBeenCalledWith("Welcome, Captain!");
});

test("يجب أن يعرض 'Enter a valid captain name' إذا لم يكن الاسم موجودًا في القائمة", () => {
    checkForName("Tala");
    expect(global.alert).toHaveBeenCalledWith("Enter a valid captain name");
});
