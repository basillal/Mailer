from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import boto3
from bs4 import BeautifulSoup
import re
import openpyxl
from openpyxl.worksheet.datavalidation import DataValidation
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Configure SES client
ses_client = boto3.client(
    'ses',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)



app = FastAPI()

# Allow all origins in development. Adjust this in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/create_template')
def read_root():
    
    def read_html_file(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            return content
        except FileNotFoundError:
            print(f"Error: File not found - {file_path}")
            raise

    def extract_placeholder_names(html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        pattern = re.compile(r'{{(.*?)}}')
        
        placeholder_names = [match.group(1).strip() for match in re.finditer(pattern, html_content)]
        
        return placeholder_names

    def write_excel(placeholder_names, excel_file_path):
        wb = openpyxl.Workbook()
        sheet = wb.active

        # Adding 'Email' column to the headers
        headers = ['Email'] + placeholder_names + ['Attachment']
        sheet.append(headers)

        # Writing default values for 'Email' and placeholder columns
        default_values = {placeholder_name: '' for placeholder_name in placeholder_names}
        default_values['Email'] = ''

        # Finding the index of the 'Attachment' column
        attachment_column_index = headers.index('Attachment')

        # Adding data validation (dropdown) for the 'Attachment' column
        dv = DataValidation(type="list", formula1='"Y,N"', allow_blank=False)
        dv.add(f'{chr(ord("A") + attachment_column_index)}2:{chr(ord("A") + attachment_column_index)}1048576')  # Assuming a maximum of 1048576 rows
        # Set the default value to "N" directly in the validation
        dv.value = "N"
        sheet.add_data_validation(dv)

        # No need for the formula to set the default value anymore

        # Append rows with default values, including 'Attachment' set to dv.value
        for _ in range(500):  # Assuming a maximum of 1048576 rows
            sheet.append([default_values[col] for col in headers[:-1]] + [dv.value])

        # Save the Excel file
        wb.save(excel_file_path)


    def create_or_update_template(template_name, html_content):
        try:
            # Check if the template exists
            existing_templates = ses_client.list_templates()['TemplatesMetadata']
            template_exists = any(template['Name'] == template_name for template in existing_templates)

            if template_exists:
                # If template exists, delete it
                ses_client.delete_template(TemplateName=template_name)
                print(f"Existing template '{template_name}' deleted.")

            # Define SES template
            template = {
                'TemplateName': template_name,
                'HtmlPart': html_content,
                'TextPart': '',
                'SubjectPart': 'test2'
            }

            # Create SES template
            response = ses_client.create_template(
                Template=template
            )
            print(f"Template '{template_name}' has been created!")
        except Exception as e:
            print(f'Failed to create/update template {template_name}.', e)

    def run(template_name):
        # Replace 'your_file.html' with the actual path to your HTML file
        file_path = 'MyEmailTemplate.html'

        try:
            html_content = read_html_file(file_path)
            placeholder_names = extract_placeholder_names(html_content)

            # Write data to Excel file
            excel_file_path = 'output_placeholder_names.xlsx'
            write_excel(placeholder_names, excel_file_path)

            # Create or update SES template
            create_or_update_template(template_name, html_content)
        except Exception as e:
            print(f'Failed to create/update template {template_name}.', e)

    # Run the function with the desired template name
    run('TEST-SAMPLE90001-Template')
    
@app.get('/fetch_email_templates')
def read_root():
    allTemplates = ses_client.list_templates() 

    # Display information about each template
    for template in allTemplates['TemplatesMetadata']:
        template_name = template['Name']        
        
        print(f"Template Name: {template_name}")
    
    return [template['Name'] for template in allTemplates['TemplatesMetadata']]


