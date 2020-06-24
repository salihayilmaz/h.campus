
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.Switch;
import android.widget.TextView;
import android.content.Context;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.sql.Timestamp;
import java.util.Locale;

public class MainActivity extends AppCompatActivity implements SensorEventListener{
##accelerometer and gyroscope

    private static List<Float> x;
    private static List<Float> y;
    private static List<Float> z;
    private TextView xValue;
    private TextView yValue;
    private TextView zValue;
    private String xValueString;
    private String yValueString;
    private String zValueString;
    private String dataLine;
    private static int dataCounter;
    private static boolean startDataRegister = false;
    private static String filename;
    private TextView test;
    private TextView minutes;
    private TextView hpButton;
    private TextView orientationRecognitionTextview;
    private EditText user;
    private Switch walking, up, down, standing, laying;
    private Button clear, orientationRecognitionButton;
    private static String activityType;
    private static String oldActivityType;
    private static float meanAverageX = 0;
    private static float meanAverageY = 0;
    private static float meanAverageZ = 0;
    private static boolean isOrientationRecognitionEnabled = false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        x = new ArrayList<>();
        y = new ArrayList<>();
        z = new ArrayList<>();
        user = (EditText) findViewById(R.id.userValueTextview);
        activityType = "0"; ##baslangic
        oldActivityType = "0";

        setButtons();
        setSwitches();
        setTextviews();

    }

    protected void onResume() {
        super.onResume();
        getSensorManager().registerListener(this, getSensorManager().getDefaultSensor(Sensor.TYPE_ACCELEROMETER), SensorManager.SENSOR_DELAY_GAME);  //getSensorManager().registerListener(this, getSensorManager().getDefaultSensor(Sensor.TYPE_GYROSCOPE), SensorManager.SENSOR_DELAY_GAME);
    }

    protected void onPause() {
        getSensorManager().unregisterListener(this);
        super.onPause();
    }

    @Override
    public void onInit(int status) {

    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        x.add(event.values[0]);
        y.add(event.values[1]);
        z.add(event.values[2]);
        checkOrientation(event.values[0],event.values[1], event.values[2]);
        xValueString = Float.toString(round(x.get(x.size() - 1), 2));
        yValueString = Float.toString(round(y.get(y.size() - 1), 2));
        zValueString = Float.toString(round(z.get(z.size() - 1), 2));
        xValue.setText(xValueString);
        yValue.setText(yValueString);
        zValue.setText(zValueString);
        checkDataWritingSwitches();
        checkDataRegister();
    }

    private void checkDataWritingSwitches(){
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        if ((walking.isChecked() || up.isChecked() || down.isChecked() || standing.isChecked() || laying.isChecked()){
            operateDataWriting(timestamp);
        }
        else if ((walking.isChecked() || up.isChecked() || down.isChecked() || standing.isChecked() || laying.isChecked()) && startDataRegister){
            operateDataWritingWithHeadphones(timestamp);
        }
        else {
            one.setEnabled(true);
            five.setEnabled(true);
            ten.setEnabled(true);
            dataCounter = 0;
        }
        oldActivityType = activityType;
    }

    private void checkOrientation(float valueX,float valueY, float valueZ){
        meanAverageX = (valueX*alpha + meanAverageX * (1-alpha));
        meanAverageY = (valueY*alpha + meanAverageY * (1-alpha));
        meanAverageZ = (valueZ*alpha + meanAverageZ * (1-alpha));
        if (isOrientationRecognitionEnabled){
            if(abs(meanAverageX) > abs(meanAverageY) && abs(meanAverageX) > abs(meanAverageZ)){
                if (meanAverageX>0){
                    orientationRecognitionTextview.setText("Left Horizontal stand");
                }else{
                    orientationRecognitionTextview.setText("Right Horizontal stand");
                }
            }
            else if (abs(meanAverageY) > abs(meanAverageX) && abs(meanAverageY) > abs(meanAverageZ)){
                if (meanAverageY>0){
                    orientationRecognitionTextview.setText("Vertical stand");

                }else{
                    orientationRecognitionTextview.setText("Reverse Vertical stand");
                }
            }
            else if (abs(meanAverageZ) > abs(meanAverageX) && abs(meanAverageZ) > abs(meanAverageY)){
                if (meanAverageZ>0) {
                    orientationRecognitionTextview.setText("Face up Sleep");
                }
                else {
                    orientationRecognitionTextview.setText("Face down Sleep");
                }
            }
            else {
                orientationRecognitionTextview.setText("ERROR");
            }
        }
    }

    private void checkDataRegister(){
        if (startDataRegister){
            hpButton.setText("Button pressed");
        }
        else {
            hpButton.setText("Button not pressed");
        }
    }

    private static float round(float d, int decimalPlace) {
        BigDecimal bd = new BigDecimal(Float.toString(d));
        bd = bd.setScale(decimalPlace, BigDecimal.ROUND_HALF_UP);
        return bd.floatValue();
    }

    private SensorManager getSensorManager() {
        return (SensorManager) getSystemService(SENSOR_SERVICE);
    }

    private void writeToFile(String data,Context context) {
        try {
            Date date = new Date() ;
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd") ;
            filename = "accData-" + dateFormat.format(date) + ".txt";
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(context.openFileOutput(filename, Context.MODE_APPEND));
            outputStreamWriter.write(data);
            outputStreamWriter.close();
        }
        catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
        }
    }

    private void cleanFile(Context context) {
        try {
            Date date = new Date() ;
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd") ;
            filename = "accData-" + dateFormat.format(date) + ".txt";
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(context.openFileOutput(filename, Context.MODE_PRIVATE));
            outputStreamWriter.write("");
            outputStreamWriter.close();
            test.setText("File (" + filename + ") cleaned");
        }
        catch (IOException e) {
            Log.e("Exception", " write failed: " + e.toString());
        }
    }

    public void buttonPressed(){
        if(startDataRegister){
##locale
        }
        else {
            test.setText("Ended");
        }
        startDataRegister = !startDataRegister;
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {

        if ((String.valueOf(keyCode)).equals("127") || (String.valueOf(keyCode)).equals("126")){
            buttonPressed();
        }

        return super.onKeyDown(keyCode, event);
    }

    private void operateDataWriting(Timestamp timestamp){
        dataLine = String.format("%d,%s,%d,%s,%s,%s%n",33, activityType,
###hatali, duzelt
                timestamp.getTime() , x.get(x.size() - 1) , y.get(y.size() - 1), z.get(z.size() - 1));
        if (activityType.equals(oldActivityType)){
            dataCounter++;
                        dataCounter = 0;
                        walking.setChecked(false);
                        up.setChecked(false);
                        down.setChecked(false);
                    }
                }
                test.setText(dataLine);
                writeToFile(dataLine , getBaseContext());
                one.setEnabled(false);
                five.setEnabled(false);
                ten.setEnabled(false);

            }
            else {
                test.setText(null);
            }
        }
        else {
            dataCounter = 0;
            test.setText(null);
        }
    }

    private void operateDataWritingWithHeadphones(Timestamp timestamp){
        dataLine = String.format("%s,%s,%d,%s,%s,%s%n",user.getText(), activityType,
                timestamp.getTime() , x.get(x.size() - 1) , y.get(y.size() - 1), z.get(z.size() - 1));
        test.setText(String.valueOf(dataCounter));
        dataCounter++;
        }
        test.setText(dataLine);
        writeToFile(dataLine , getBaseContext());

    }

    private void setTextviews(){
        xValue = (TextView) findViewById(R.id.xValueTextview);
        yValue = (TextView) findViewById(R.id.yValueTextview);
        zValue = (TextView) findViewById(R.id.zValueTextview);
        minutes = (TextView) findViewById(R.id.minutesTextview);
        test = (TextView) findViewById(R.id.testValueTextview);
        hpButton = (TextView) findViewById(R.id.buttonStateValueTextview);
        orientationRecognitionTextview = (TextView) findViewById(R.id.orRecStateValueTextview);
    }

    private void setButtons(){
        one = (Button) findViewById(R.id.oneButton);
        five = (Button) findViewById(R.id.fiveButton);
        ten = (Button) findViewById(R.id.tenButton);
        clear = (Button) findViewById(R.id.clearButton);
        orientationRecognitionButton = (Button) findViewById(R.id.bonus2Button);
    }

    private void setSwitches(){
        walking = (Switch) findViewById(R.id.walkingSwitch);
        up = (Switch) findViewById(R.id.upSwitch);
        down = (Switch) findViewById(R.id.downSwitch);
        standing = (Switch) findViewById(R.id.standingSwitch);
        laying = (Switch) findViewById(R.id.layingSwitch);findViewById(R.id.headphonesSwitch);
        setListenersForSwitches();
    }

    private void setListenersForSwitches(){
        one.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                minutes.setText("1");
            }
        });
        five.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                minutes.setText("5");
            }
        });
        ten.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                minutes.setText("10");
            }
        });
        clear.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                test.setText("cleared");
                cleanFile(getBaseContext());
            }
        });
        orientationRecognitionButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                if (orientationRecognitionTextview.getText() == "ON"){
                    orientationRecognitionTextview.setText("OFF");
                    isOrientationRecognitionEnabled = false;
                }
                else {
                    orientationRecognitionTextview.setText("ON");
                    isOrientationRecognitionEnabled = true;
                }
            }
        });
        walking.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked){
                    activityType = "Walking";
                    up.setChecked(false);
                    down.setChecked(false);
                    standing.setChecked(false);
                    laying.setChecked(false);
                }
            }
        });
        up.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked){
                    activityType = "Upstairs";
                    walking.setChecked(false);
                    down.setChecked(false);
                    standing.setChecked(false);
                    laying.setChecked(false);
                }
            }
        });
        down.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked){
                    activityType = "Downstairs";
                    up.setChecked(false);
                    walking.setChecked(false);
                    standing.setChecked(false);
                    laying.setChecked(false);
                }
            }
        });
        standing.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked){
                    activityType = "Standing";
                    up.setChecked(false);
                    walking.setChecked(false);
                    down.setChecked(false);
                    laying.setChecked(false);

                }
            }
        });
        laying.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked){
                    activityType = "Laying";
                    up.setChecked(false);
                    walking.setChecked(false);
                    down.setChecked(false);
                    standing.setChecked(false);
                }
            }
        });
        });
    }


}
