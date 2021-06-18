from django.db import models

# Create your models here.
class Departaments(models.Model):
    DepartmentId = models.AutoField(primary_key=True)
    DepartmentName= models.CharField(max_length=100)

class Employees(models.Model):
    EmployeeId=models.AutoField(primary_key=True)
    EmployeeName=models.CharField(max_length=100)
    Department=models.CharField(max_length=100)
    DateOfJoining=models.DateField()
    photoFileName=models.CharField(max_length=100)
