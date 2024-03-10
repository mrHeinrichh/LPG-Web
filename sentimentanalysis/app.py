import pandas as pd
import streamlit as st
import plotly.express as px
import streamlit as st
from PIL import Image
import streamlit as st
import pandas as pd
import plotly.express as px
from PIL import Image

# Define a dictionary mapping each question to its data
questions_data = {
    "Question #1": {"sheet_name": "Q1", "text": "Application Responsiveness: How satisfied are you with the speed and responsiveness of our mobile/web application when browsing and making purchases?"},
    "Question #2": {"sheet_name": "Q2", "text": "Order Acceptance: How satisfied are you with the approval and speed of your transaction in the system?"},
    "Question #3": {"sheet_name": "Q3", "text": "Rider Performance: How satisfied are you with the communication skills and punctuality of the delivery rider in delivering your LPG order?"},
    "Question #4": {"sheet_name": "Q4", "text": "Overall Satisfaction: On a scale of 1 to 5, how would you describe your overall experience using our mobile/web application to purchase LPG products?"},
    "Question #5": {"sheet_name": "Q5", "text": "Recommendation to Others: Overall, how likely are you to recommend our mobile/web application to others based on your experience using it for LPG purchases?"}
}

# Set page configuration
st.markdown("<style> .reportview-container { background: url('images/MADS.png'); background-size: cover; } </style>", unsafe_allow_html=True)
st.markdown("""
<style>
    .justify-text {
        text-align: justify;
        font-weight: bold;
        font-size: 20px;
        color: white;
    }
</style>
""", unsafe_allow_html=True)

st.markdown("<h1 style='text-align: center; color: white;'>SENTIMENT ANALYSIS RESULTS</h1>", unsafe_allow_html=True)

# Display the buttons for selecting the question
selected_question = st.sidebar.radio("Choose Question Number:", list(questions_data.keys()))

# Load the data for the selected question
excel_file = 'Testing_Sentiment.xlsx'
sheet_name = questions_data[selected_question]["sheet_name"]
df = pd.read_excel(excel_file, sheet_name=sheet_name, usecols='A:E', header=0)

# Display the question text
st.markdown(f"<p class='justify-text'>{selected_question}<br>{questions_data[selected_question]['text']}</p>", unsafe_allow_html=True)

# --- STREAMLIT SELECTION FOR AVERAGE RATING
if 'Rating' in df.columns:
    st.subheader("")

    # Filter data between ratings 1 and 5
    filtered_df = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]

    # Calculate the average rating
    average_rating = filtered_df['Rating'].mean()

    # Display the average rating with bigger font size
    st.write(f"<p style='font-size: 30px;'>Current Average Rating: {average_rating:.2f} {'⭐' * int(round(average_rating))}</p>", unsafe_allow_html=True)
else:
    st.write("No rating data available for this question.")

# --- STREAMLIT SELECTION
if 'Rating' in df.columns:
    ratings = df['Rating'].unique().tolist()
    rating_selection = st.sidebar.slider('Rating:',
                                min_value=1,  # Set min value to 1
                                max_value=5,  # Set max value to 5
                                step=1,  # Set step size to 1
                                value=(1, 5))  # Set initial value to cover the entire range

    min_rating, max_rating = rating_selection
    filtered_df = df[(df['Rating'] >= min_rating) & (df['Rating'] <= max_rating)]

   # Filter the DataFrame based on the selected rating range
    filtered_df = df[(df['Rating'] >= min_rating) & (df['Rating'] <= max_rating)]

   # Calculate the rating counts for the filtered DataFrame
    rating_counts = filtered_df['Rating'].value_counts().sort_index()

   # Plot the bar graph for the rating distribution of the filtered DataFrame
    fig_bar = px.bar(x=rating_counts.index, y=rating_counts.values, labels={'x': 'Rating', 'y': 'Count'})
    st.subheader('Rating Distribution:')
    st.plotly_chart(fig_bar)

    st.subheader(f'Data for ratings between {min_rating} and {max_rating}:')
    st.dataframe(filtered_df)

    # --- STREAMLIT SELECTION FOR SENTIMENT DISTRIBUTION
    if 'Sentiment' in df.columns:
        sentiment_counts = filtered_df['Sentiment'].value_counts()

        if not sentiment_counts.empty:
            st.subheader('Sentiment Distribution:')

            # Plotting pie chart using plotly
            fig = px.pie(sentiment_counts, 
                values=sentiment_counts.values, 
                names=sentiment_counts.index,)
            fig.update_traces(textposition='inside', textinfo='percent+label+value')
            fig.update_layout(legend=dict(orientation='h', yanchor='bottom', y=1.02, xanchor='right', x=1),
                  font=dict(size=20))  # Adjust the font size as needed

            st.write(sentiment_counts)
            st.plotly_chart(fig)
        else:
            st.write("No sentiment data available for the selected rating range.")
    else:
        st.write("No sentiment data available for this question.")
else:
    st.write("No rating data available for this question.")
