Public NotInheritable Class ThRuntime
    Private Sub New()
    End Sub


    Public Shared ReadOnly Property IsDebugMode As Boolean
        Get
#If DEBUG Then
            Return True
#Else
            Return False
#End If
        End Get
    End Property


End Class