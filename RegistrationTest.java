package automation;

import java.io.File;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import com.google.common.io.Files;

public class RegistrationTest {

    // Method to take screenshot
    public static void takeScreenshot(WebDriver driver, String fileName) throws Exception {
        File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        File dest = new File("C:/Users/Silky/Downloads/REGISTRATIONFORM/screenshots/" + fileName + ".png");
        Files.copy(src, dest);
    }

    public static void main(String[] args) throws Exception {

        System.setProperty(
            "webdriver.chrome.driver",
            "C:/Users/Silky/Downloads/chromedriver-win32/chromedriver-win32/chromedriver.exe"
        );

        WebDriver driver = new ChromeDriver();

        driver.get("file:///C:/Users/Silky/Downloads/REGISTRATIONFORM/index.html");

        System.out.println(driver.getCurrentUrl());
        System.out.println(driver.getTitle());

        // ================= NEGATIVE TEST =================
        driver.findElement(By.id("fname")).sendKeys("Anshika");
        driver.findElement(By.id("email")).sendKeys("test@gmail.com");
        driver.findElement(By.id("phone")).sendKeys("9876543210");

        Select gender1 = new Select(driver.findElement(By.id("gender")));
        gender1.selectByVisibleText("Female");

        takeScreenshot(driver, "Negative_Before_Submit");

        Thread.sleep(2000);
        driver.findElement(By.id("submitBtn")).click();

        Thread.sleep(2000);
        takeScreenshot(driver, "Negative_After_Submit");

        driver.navigate().refresh();

        // ================= POSITIVE TEST =================
        driver.findElement(By.id("fname")).sendKeys("Anshika");
        driver.findElement(By.id("lname")).sendKeys("Sharma");
        driver.findElement(By.id("email")).sendKeys("valid@gmail.com");
        driver.findElement(By.id("phone")).sendKeys("9876543210");

        Select country = new Select(driver.findElement(By.id("country")));
        country.selectByVisibleText("India");

        driver.findElement(By.id("state")).sendKeys("UP");
        driver.findElement(By.id("city")).sendKeys("Ghaziabad");

        Select gender2 = new Select(driver.findElement(By.id("gender")));
        gender2.selectByVisibleText("Female");

        driver.findElement(By.id("password")).sendKeys("Test@123");
        driver.findElement(By.id("confirmPassword")).sendKeys("Test@123");
        driver.findElement(By.id("terms")).click();

        takeScreenshot(driver, "Positive_Before_Submit");

        Thread.sleep(2000);
        driver.findElement(By.id("submitBtn")).click();

        Thread.sleep(2000);
        takeScreenshot(driver, "Positive_After_Submit");

        Thread.sleep(3000);
        driver.quit();
    }
}
