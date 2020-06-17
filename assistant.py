import pyttsx3
import webbrowser
import smtplib
import random
import speech_recognition as sr
import wikipedia
import datetime
import wolframalpha
import os
import sys

#run on the terminal below,
#pip install pyttsx3
#pip install speechRecognition
#pip install wolframalpha
#pip install wikipedia
#pip install pipwin
#pip install pyaudio 

engine = pyttsx3.init('sapi5')

client = wolframalpha.Client('Your_App_ID')

voices = engine.getProperty('voices')
engine.setProperty('voice', voices[len(voices) - 1].id)

def speak(audio):
    print('Florence: ' + audio)
    engine.say(audio)
    engine.runAndWait()
    
def greetMe():
    currentH = int(datetime.datetime.now().hour)
    if currentH >= 0 and currentH < 12:
        speak('Salut!')

    if currentH >= 12 and currentH < 18:
        speak('Bonne après-midi!')

    if currentH >= 18 and currentH != 0:
        speak('Bon soir')

greetMe()

speak('Bonjour, Je suis Florence, ta assistante de pronote')
speak('Que puis je faire pour toi?')


def myCommand():
   
    r = sr.Recognizer()                                                                                   
    with sr.Microphone() as source:                                                                       
        print("alors?")
        r.pause_threshold = 1
        audio = r.listen(source)
    try:
        query = r.recognize_google(audio, language='fr-fr')
        print('User: ' + query + '\n')
        
    except sr.UnknownValueError:
        speak('Pardon! Je ne comprends pas!')
        query = str(input('Toi: '))

    return query
        

if __name__ == '__main__':

    while True:
    
        query = myCommand()
        query = query.lower()
        
        if 'ouvre youtube' in query:
            speak('ok, mais uniquement pour les cours')
            webbrowser.open('www.youtube.fr')

        elif 'ouvre google' in query:
            speak('okidoki')
            webbrowser.open('www.google.fr')

        elif 'envoyer gmail' in query:
            speak('okidoki')
            webbrowser.open('www.gmail.fr')

        elif "qoui de neuf" in query or 'comment vas tu' in query:
            stMsgs = ['moitié de dix huit!', 'je vais bien!', 'Trés bien!', 'Super!']
            speak(random.choice(stMsgs))

        elif 'envoyer mail' in query:
            speak('à quel prof? ')
            recipient = myCommand()

            if 'moi' in recipient:
                try:
                    speak('Quel message? ')
                    content = myCommand()
        
                    server = smtplib.SMTP('smtp.gmail.com', 587)
                    server.ehlo()
                    server.starttls()
                    server.login("Your_Username", 'Your_Password')
                    server.sendmail('Your_Username', "Recipient_Username", content)
                    server.close()
                    speak('Email envoyé! tu es libre')

                except:
                    speak('Pardon! Je suis indisponible pour le moment!')


        elif 'rien' in query or 'annule' in query or 'stop' in query:
            speak('compris')
            speak('Bye bye, passer très bonne journée')
            sys.exit()
           
        elif 'Salut' in query:
            speak('Salut Toi')

        elif 'bye' in query:
            speak('Bye bye, passer très bonne journée')
            sys.exit()
                                    
        elif 'play music' in query:
            music_folder = Your_music_folder_path
            music = [music1, music2, music3, music4, music5]
            random_music = music_folder + random.choice(music) + '.mp3'
            os.system(random_music)
                  
            speak('Voila, ta musique! ha ha ha')
            

        else:
            query = query
            speak('Searching...')
            try:
                try:
                    res = client.query(query)
                    results = next(res.results).text
                    speak('WOLFRAM-ALPHA dit - ')
                    speak('Compris')
                    speak(results)
                    
                except:
                    results = wikipedia.summary(query, sentences=2)
                    speak('Compris')
                    speak('WIKIPEDIA dit - ')
                    speak(results)
        
            except:
                webbrowser.open('www.google.fr')
        
        speak('Question suivante')
        

